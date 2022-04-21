// this is an es6 file, code below is to allow for CommonJS require
import { createRequire } from "module"
export const require = createRequire(import.meta.url)
// end of fix