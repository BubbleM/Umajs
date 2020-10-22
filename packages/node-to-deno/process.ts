const process = {
  env: function(name:string){
    for(let key of Deno.args) {
      let envItem = key.split('=');
      if(envItem[0] === name) return envItem[1];
    }
    return;
  }
}

export default process;