import { Path } from 'https://deno.land/x/path/mod.ts';

const fs = {
  existsSync: function(dirPath: string){
    let path = new Path(dirPath);
  
    return path.exists;
  },
  readdirSync: function(dirPath: string){
    return Deno.readDirSync(dirPath);
  },
  isDir: function(dirPath: string) {
    return new Path(dirPath).isDir;
  }
}

export default fs;