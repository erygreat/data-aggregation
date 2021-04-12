const fs = require("fs");
const path = require("path");
const pluginDirs = fs.readdirSync(__dirname);

publicImportCode = "";
exportModuleCode = "";
pluginDirs.forEach(dir => {
    absolutePath = path.posix.join(dir, "./public/index.ts");
    if(fs.existsSync(path.resolve(__dirname, absolutePath))) {
        publicImportCode += `import ${dir} from "./${absolutePath}";\n`
        exportModuleCode += ` ${dir},`
    }
})
exportModuleCode = exportModuleCode.length > 0 ? exportModuleCode.slice(0, exportModuleCode.length - 1) : exportModuleCode
exportModuleCode = `export default {${exportModuleCode} };`

publicImportCode += "\n" + exportModuleCode;
const pluginConfigPath = path.resolve(__dirname, "./plugin.js")
fs.writeFileSync(pluginConfigPath, publicImportCode)