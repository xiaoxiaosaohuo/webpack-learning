
const path = require("path");
const cacache = require("cacache");
const serialize = require("serialize-javascript");
const loaderUtils = require("loader-utils");
const findCacheDir = require("find-cache-dir");
// const writeFile = require("../writeFile");
const isObject = require("./utils/isObject");


const { stat, readFile } = require ("./utils/promisify");

const { name, version }  = require ('../../../package.json');

const crypto   = require ('crypto') ;

module.exports =  function writeFile(globalRef, pattern, file) {
    const { info, debug, compilation, fileDependencies, written, inputFileSystem, copyUnmodified } = globalRef;
    debugger;
    return stat(inputFileSystem, file.absoluteFrom)
        .then((stat) => {
            // We don't write empty directories
            if (stat.isDirectory()) {
                return;
            }

            // If this came from a glob, add it to the file watchlist
            if (pattern.fromType === 'glob') {
                fileDependencies.push(file.absoluteFrom);
            }

            info(`reading ${file.absoluteFrom} to write to assets`);
            return readFile(inputFileSystem, file.absoluteFrom)
                .then((content) => {
                    if (pattern.transform) {
                        const transform = (content, absoluteFrom) => {
                            return pattern.transform(content, absoluteFrom);
                        };

                        if (pattern.cache) {
                            if (!globalRef.cacheDir) {
                                globalRef.cacheDir = findCacheDir({ name: 'copy-webpack-plugin' });
                            }

                            const cacheKey = pattern.cache.key
                                ? pattern.cache.key
                                : serialize({
                                    name,
                                    version,
                                    pattern,
                                    hash: crypto.createHash('md4').update(content).digest('hex')
                                });

                            return cacache
                                .get(globalRef.cacheDir, cacheKey)
                                .then(
                                    (result) => result.data,
                                    () => {
                                        return Promise
                                            .resolve()
                                            .then(() => transform(content, file.absoluteFrom))
                                            .then((content) => cacache.put(globalRef.cacheDir, cacheKey, content)
                                                .then(() => content));
                                    }
                                );
                        }

                        content = transform(content, file.absoluteFrom);
                    }

                    return content;
                }).then((content) => {
                    if (pattern.toType === 'template') {
                        info(`interpolating template '${file.webpackTo}' for '${file.relativeFrom}'`);

                        // If it doesn't have an extension, remove it from the pattern
                        // ie. [name].[ext] or [name][ext] both become [name]
                        if (!path.extname(file.relativeFrom)) {
                            file.webpackTo = file.webpackTo.replace(/\.?\[ext\]/g, '');
                        }

                        file.webpackTo = loaderUtils.interpolateName(
                            { resourcePath: file.absoluteFrom },
                            file.webpackTo,
                            {
                                content,
                                regExp: file.webpackToRegExp,
                                context: pattern.context
                            }
                        );
                    }

                    return content;
                }).then((content) => {
                    if (pattern.transformPath) {
                        return Promise.resolve(
                            pattern.transformPath(file.webpackTo, file.absoluteFrom)
                        ).then((newPath) => {
                            file.webpackTo = newPath;
                        }).then(() => content);
                    }

                    return content;
                }).then((content) => {
                    const hash = loaderUtils.getHashDigest(content);

                    if (!copyUnmodified &&
                        written[file.absoluteFrom] &&
                        written[file.absoluteFrom]['hash'] === hash &&
                        written[file.absoluteFrom]['webpackTo'] === file.webpackTo
                    ) {
                        info(`skipping '${file.webpackTo}', because it hasn't changed`);
                        return;
                    } else {
                        debug(`added ${hash} to written tracking for '${file.absoluteFrom}'`);
                        written[file.absoluteFrom] = {
                            hash: hash,
                            webpackTo: file.webpackTo
                        };
                    }

                    if (compilation.assets[file.webpackTo] && !file.force) {
                        info(`skipping '${file.webpackTo}', because it already exists`);
                        return;
                    }

                    info(`writing '${file.webpackTo}' to compilation assets from '${file.absoluteFrom}'`);
                    compilation.assets[file.webpackTo] = {
                        size: function () {
                            return stat.size;
                        },
                        source: function () {
                            return content;
                        }
                    };
                });
        });
}