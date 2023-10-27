/** @param {NS} ns */

//*This function returns an array of servers dynamically
//
function dpList(ns, current="home", set=new Set()){
  let connections = ns.scan(current)
  let next = connections.filter(c => !set.has(c))
  next.forEach(n => {
    set.add(n);
    return dpList(ns, n, set)
  })
  return Array.from(set.keys())
}
function threadcount(ns, hostname, scriptRam){
  let threads = 0;
  let free_ram = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);

  threads = free_ram/scriptRam
  return Math.floor(threads) //Flooring returns interger
}
export async function main(ns) {
  let servers = dpList(ns)
    while(true){
      for (let server of servers){
        //Try to gain root acess to servers
        //divert all of the server's threads to the most valuable command \
          let available_threads = threadcount(ns, server, )
          if(ns.hasRootAcess(server)){
          
          } else{
            //open all possible ports on every server; then attempt to nuke the server
            try{
              //try block
              ns.brutessh(server)
              ns.ftpcrack(server)
              ns.relaysmtp(server)
              ns.httpworm(server)
              ns.sqlinject(server)
            } catch{
              //if try block does not work the catch will fail the loop
              //will never hit the else statement if try block is here
            }
            try{
              ns.nuke(server)
            }catch{

            }
          }

      }
      //weaken the target while security>minsecurity
      if(ns.getServerBaseSecurityLevel("server")>ns.getServerMinSecurityLevel){
         ns.exec("bin.wk.js", server, available_threads)
      }
      //grow the target while money<maxmoney
      else if(ns.getServerMoneyAvailable("server")<ns.getServerMaxMoney("server")){
        ns.exec("bin.gr.js", server, available_threads)
      }
      else{  //hack the target
         ns.exec("bin.hk.js", server, available_threads)
      }
    }
}
