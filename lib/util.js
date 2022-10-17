const merge = require('deepmerge');

// 定义try语句模板
let tryTemplate = `
try {
} catch (e) {
console.log(CatchError,e)
}`;

/*
 * catch要打印的信息
 * @param {string} filePath - 当前执行文件的路径
 * @param {string} funcName - 当前执行方法的名称
 * @param {string} customLog - 用户自定义的打印信息
 */
let catchConsole = (filePath, funcName, customLog) => `
filePath: ${filePath}
funcName: ${funcName}
${customLog}:`;

// 默认配置
const defaultOptions = {
  customLog: 'Error',
  exclude: ['node_modules'],
  include: []
};

// 判断执行的file文件 是否在 options 选项 exclude/include 内
function matchesFile(list, filename) {
  return list.find((name) => name && filename.includes(name));
}

function mergeOptions(options) {
  let { exclude, include } = options;
  if (exclude) options.exclude = toArray(exclude);
  if (include) options.include = toArray(include);

  // 合并选项
  return merge.all([defaultOptions, options]);
}

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

module.exports = {
  tryTemplate,
  catchConsole,
  defaultOptions,
  mergeOptions,
  matchesFile,
  toArray
};
