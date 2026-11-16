import {readFile,writeFile,rename,mkdir} from 'node:fs/promises';import {dirname} from 'node:path';
export class Store {
 constructor(path){this.path=path;this.data={requests:{},preferences:{}};this.serial=Promise.resolve()}
 async load(){try{this.data=JSON.parse(await readFile(this.path,'utf8'))}catch(e){if(e.code!=='ENOENT')throw e}return this}
 async save(){const run=async()=>{await mkdir(dirname(this.path),{recursive:true});const temp=this.path+'.tmp';await writeFile(temp,JSON.stringify(this.data,null,2),{mode:0o600});await rename(temp,this.path)};this.serial=this.serial.then(run);return this.serial}
 get(user){return this.data.requests[String(user)]||null}
 async set(user,request){this.data.requests[String(user)]=request;await this.save()}
 async clear(user){delete this.data.requests[String(user)];await this.save()}
}
