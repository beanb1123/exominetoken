/*jshint esversion: 6 */

function set_circle_element(elm, value) {
    value = value.toFixed(0);
    if (value > 100) value = 100;

    value2 = (360 / 100) * value;
    // ---
    /*
    circle2
    */
    elm2 = elm + "_text";
    let f4 = document.getElementById(elm2);
    f4.textContent = value + "%";

    let f3 = document.getElementById(elm);

    if (value >= 0 && value <= 60)
        f3.setAttribute('stroke', "#00bb00");

    if (value >= 60 && value <= 75)
        f3.setAttribute('stroke', "#ffaa00");

    if (value >= 75)
        f3.setAttribute('stroke', "#ff5555");

    var buffer = "";

    //

    var cx = 200;
    var cy = 200;

    //   buffer += "M "+cx+" "+cy+" ";
    buffer += "";

    var radius = 170;

    var maxrad = value2;
    for (var deg = 0; deg < maxrad; deg += 5) {
        deg2 = -deg + 180;

        var x = Math.sin(deg2 * Math.PI / 180) * radius;
        var y = Math.cos(deg2 * Math.PI / 180) * radius;

        if (deg == 0) {
            buffer += "M " + (x + cx) + " " + (y + cy) + " ";

            } else {
                buffer += "L " + (x + cx) + " " + (y + cy) + " ";
            }
        }
        // buffer += "L 240 300 ";
        //  buffer += "L 240 350 ";
        buffer += " ";

        f3.setAttribute('d', buffer);

    } // set_circle_element

    function set_circle_element_node(elm, value) {
        value = value.toFixed(0);
        value2 = (360 / 100) * value;
        // ---
        /*
        circle2
        */
        let f3 = document.getElementById(elm);

        if (value >= 0 && value < 25)
            f3.setAttribute('stroke', "#ff5555");

        if (value >= 25 && value < 50)
            f3.setAttribute('stroke', "#ffaa00");

        if (value >= 50 && value < 75)
            f3.setAttribute('stroke', "#5bc0de");

        if (value >= 75 && value < 100)
                f3.setAttribute('stroke', "#0275d8");

        if (value >= 100)
            f3.setAttribute('stroke', "#00bb00");

        var buffer = "";

        //

        var cx = 200;
        var cy = 200;

        //   buffer += "M "+cx+" "+cy+" ";
        buffer += "";

        var radius = 170;

        var maxrad = value2;
        for (var deg = 0; deg < maxrad; deg += 5) {
            deg2 = -deg + 180;

            var x = Math.sin(deg2 * Math.PI / 180) * radius;
            var y = Math.cos(deg2 * Math.PI / 180) * radius;

            if (deg == 0) {
                buffer += "M " + (x + cx) + " " + (y + cy) + " ";

            } else {
                buffer += "L " + (x + cx) + " " + (y + cy) + " ";
            }
        }
        // buffer += "L 240 300 ";
        //  buffer += "L 240 350 ";
        buffer += " ";

        f3.setAttribute('d', buffer);

    } // set_circle_element

    var radius = 0;
    var radius_net = 0;
    var radius_node = 0;

    function doitx(param) {
        //alert("P: " + param);

        if (param == 1) {
            //   document.getElementById('kreis').cx = 230;

            radius_net += 5;
            set_circle_element("mynet", radius_net);

        }

        if (param == 2) {
            //  let f1 = document.getElementById('kreis');
            //f1.setAttribute('cx','210');

            cpuvalue = document.getElementById('cpuvalue').value;

            radius += 10.1;
            // radius = 50;
            set_circle_element("mycpu", radius);

            // <circle id='kreis' cx="200" cy="200" r="40" stroke="#999999" stroke-width="1" fill="#ffffff" />

            // ---
        }

            if (param == 3) {
                        //   document.getElementById('kreis').cx = 230;

            radius_node += 5;
            set_circle_element_node("mynode", radius_node);

        }



}


                    var counter = 0;
                    var initstatus = 0;
                    var automining = 0;
                    var cpuAutoMining = 0;
                    var autominer_cnt = 0;
                    var cpuAutoMiner_cnt = 0;

                    function switch_autominer(val) {

                        // alert(val.checked);

                        if (val.checked) automining = 1;
                        else automining = 0;

                        //alert("automining:" + automining);

                    } // switch_autominer

                    function update_ticker() {
                        autominer_cnt++;

                        if (autominer_cnt == 11) autominer_cnt = 1;
                        //---
                        for (var i = 1; i <= 10; i++) {
                            var therect = 'rect' + i;
                            let f2 = document.getElementById(therect);
                            f2.setAttribute('fill', "#cccccc");

                        }

                        var therect = 'rect' + autominer_cnt;
                        let f3 = document.getElementById(therect);
                        f3.setAttribute('fill', "#000000");
                        //---

                    } // update_ticker

                    function app_thread() {
                        counter++;

                        // show buttons
                        if (scatter_account != undefined && scatter_account != "") {
                            document.getElementById('doinit').style.background = "#00C851";

                        }

                        if (automining > 0) {

                            //

                            //       dotransaction();
                            // ACTIVATE
                            dotransaction_bundle();
                        }

                        if (cpuAutoMining > 0) {

                            do_cpu_transaction_bundle();
                        }

                       time = setTimeout('app_thread()', 60000);
                    }
                    // function app_thread()

                    // Transaction BEGIN ------------------------
                    function dotransaction() {

                        eosobject.transaction({
                            actions: [{
                                account: 'exominetoken',
                                name: 'mine',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                data: {
                                    "miner": scatter_account,
                                }

                            }]
                        }).then(result => {
                            
                            // If Success
                            console.log("Success!!!");

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //alert( 'Error:' + err.error.details[0].message );

                            return;

                        });

                    } // function dotransaction()

                    // Transaction BEGIN ------------------------
                    function dotransaction_bundle() {

                         eosobject.getTableRows({
                            "json": "true",
                            "code": "swap.alcor",
                            "scope": "1230",
                            "table": "positions",
                            "upper_bound": scatter_account,
                            "lower_bound": scatter_account
                        }).then(function(value) {

                                mining_rate = value.rows[0].liquidity / 10000;

                                exo_rate = mining_rate.toFixed(8) + " EXO";


                            } // value

                        );

                        

function switch_cpu_autominer(val) {

                        // alert(val.checked);

                        if (val.checked) cpuAutoMining = 1;
                        else cpuAutoMining = 0;

                        //alert("automining:" + automining);

                    } // switch_autominer

function update_cpu_ticker() {
                        cpuAutoMiner_cnt++;

                        if (cpuAutoMiner_cnt == 11) cpuAutoMiner_cnt = 1;
                        //---
                        for (var i = 1; i <= 10; i++) {
                            var therect = 'cpurect' + i;
                            let f2 = document.getElementById(therect);
                            f2.setAttribute('fill', "#cccccc");

                        }

                        var therect = 'cpurect' + cpuAutoMiner_cnt;
                        let f3 = document.getElementById(therect);
                        f3.setAttribute('fill', "#000000");
                        //---

                    } // update_ticker


                    // function app_thread()

                    // Transaction BEGIN ------------------------
function do_cpu_transaction() {


                        eosobject.transaction({
                            actions: [{
                                account: "exominetoken",
                                name: 'mine',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                data: {
                                    "miner": scatter_account
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            //alert('Success');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //alert( 'Error:' + err.error.details[0].message );


                            return;

                        });

                    } // function dotransaction()

                    
                    function timeConverter(UNIX_timestamp) {
                        var a = new Date(UNIX_timestamp * 1000);
                        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        var year = a.getFullYear();
                        var month = months[a.getMonth()];
                        var date = a.getDate();
                        var hour = a.getHours();
                        var min = a.getMinutes();
                        var sec = a.getSeconds();
                        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                        return time;
                    }

                    // GetBalance BEGIN ------------------------
                    function get_balance() {

                        if (scatter_account == undefined) return;
                        if (eosobject == null) return;

                        eosobject.getAccount(scatter_account).then(function(value) {

                                //console.log(value);
                                if (value == null)
                                    return;

                                var cpu_available = value.cpu_limit.available;

                                var cpu_max = value.cpu_limit.max;

                                var cpu_used = value.cpu_limit.used;

                                var net_max = value.net_limit.max;

                                var net_used = value.net_limit.used;

                                var balance = value.core_liquid_balance;

                                var balance1 = value.core_liquid_balance;

                                var balance2 = value.core_liquid_balance;

                                var cpu_proz = (cpu_used / cpu_max) * 100;
                                cpu_proz = Number(cpu_proz).toFixed(1);

                                var net_proz = (net_used / net_max) * 100;
                                net_proz = Number(net_proz).toFixed(1);

                                if (document.getElementById('balance')) {
                                    document.getElementById('balance').innerHTML = "" + balance;
                                }

                                if (document.getElementById('balance1')) {
                                    document.getElementById('balance1').innerHTML = "" + balance;
                                }

                                if (document.getElementById('balance2')) {
                                    document.getElementById('balance2').innerHTML = "" + balance;
                                }

                                if (document.getElementById('mycpu')) {
                                    cpu_proz = Number(cpu_proz).toFixed(0) * 1;
                                    //  document.getElementById('div_cpu').innerHTML =  cpu_proz + "%";
                                    set_circle_element("mycpu", cpu_proz);
                                }

                                if (document.getElementById('mynet')) {
                                    net_proz = Number(net_proz).toFixed(0) * 1;

                                    // document.getElementById('div_net').innerHTML =  net_proz + "%";
                                    set_circle_element("mynet", net_proz);
                                }

                                //div_cpu div_net

                            } // function

                        );

                       
                                .getElementById('dotransaction_bundle').style.visibility = "hidden";
                                //   return Promise.reject(err);
                            }
                            //---

                            /*  var storebalance = value.rows[0].storebalance;
                            var unstaking = value.rows[0].unstaking;
                            var unstake_time = value.rows[0].unstake_time;
                            */
                            balance_token = last * 10000;

                            //document.getElementById('balance').innerHTML = "Your Balance: <span class='bold'>" + last + "</span>";
                            if (document.getElementById('svx_balance')) {
                                document.getElementById('svx_balance').innerHTML = "<span class='bold'>" + last + " SVX</span>";
                            }
                            /*
                                                if (document.getElementById('sov_liquid')) {
                                                    document.getElementById('sov_liquid').innerHTML = "<span class='bold'>" + storebalance + " stored | " + unstaking + " unstaking | " + unstake_time + " timestamp</span>";
                                                }
                            */
                        });

                    } // function getbalance()

                    // GetBalance END ------------------------

                    // GetBalance BEGIN ------------------------
                    function gettabledata() {
                        //tabledata

                        if (eosobject == null)
                            return;

                        // sovsovsov223 sovmintofeos
                        //eosobject.getTableRows( {"json": "true", "code":"eosio.token", "scope":scatter_account, "table":"accounts" } ).then
                        eosobject.getTableRows({
                            "json": "true",
                            "code": "sovmintofeos",
                            //                    "code": "sovsovsov223",

                            "scope": "SOV",
                            "table": "stat"
                        }).then(function(value) {

                                sov_supply = value.rows[0].supply;

                                document.getElementById('tabledata').innerHTML = sov_supply;

                            } // value

                        );

                    } // function gettabledata()

                    // GetBalance END ------------------------

                    function change_node_click() {
                        var node = document.getElementById('scatter_host').value;


                        scatter_host = node;

                        const network = ScatterJS.Network.fromJson({
                            blockchain: 'eos',
                            chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                            host: scatter_host,
                            port: 443,
                            protocol: 'https'
                        });

                        ScatterJS.connect('sovdex', {
                            network
                        }).then(connected => {
                            if (!connected)
                                return false;
                            scatter = ScatterJS.scatter;
                            scatterobj = scatter;

                            eosobject = scatter.eos(network, Eos);

                            scatter.addEventHandler((event, payload) => {

                                //alert("Jau");
                            });
                        });

                    } // change_node_click()

                    function format_eos_amount(amount) {

                        betamount = amount + "";

                        var n = betamount.indexOf(".");

                        if (n == -1) {
                            betamount = betamount + ".0000";

                            n = betamount.indexOf(".");
                        }

                        var l = betamount.length;
                        diff = l - n - 1;

                        amount2 = betamount;
                        for (i = diff; i < 4; i++)
                            amount2 += '0';

                        amount2 = parseFloat(amount2).toFixed(4);

                        return (amount2);

                    }
                    // format_eos_amount


                    function format_btc_amount(amount) {

                        betamount = amount + "";

                        var n = betamount.indexOf(".");

                        if (n == -1) {
                            betamount = betamount + ".00000000";

                            n = betamount.indexOf(".");
                        }

                        var l = betamount.length;
                        diff = l - n - 1;

                        amount2 = betamount;
                        for (i = diff; i < 8; i++)
                            amount2 += '0';

                        amount2 = parseFloat(amount2).toFixed(8);

                        return (amount2);

                    }
                    // format_pow_amount



                    // format_btc_amount


                    // SCATTER BEGIN ------------------------

                    /*

                    */

                    ScatterJS.plugins(new ScatterEOS());

                    //var scatter_host = 'eos.greymass.com';
                    var scatter_host = 'eos.api.eosnation.io';
                    /*
                                const network = ScatterJS.Network.fromJson({
                                    blockchain: 'eos',
                                    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                    //                host: 'nodes.get-scatter.com',
                                    host: 'eos.greymass.com',
                                    port: 443,
                                    protocol: 'https'
                                });
                    */
                    const network = ScatterJS.Network.fromJson({
                        blockchain: 'eos',
                        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                        host: scatter_host,
                        port: 443,
                        protocol: 'https'
                    });

                    var eosobject = null;
                    var scatter_account = "";
                    var scatterobj;
                    var this_smartcontract = "";

                    function loginclick() {
                        if (scatter_account == "" || scatter_account == null) {

                            //      document.getElementById('spinnerdiv').style.visibility = "visible";
                            //    document.getElementById('buttontext').style.visibility = "hidden";
                            //document.getElementById('scatterhint').style.visibility = "hidden";

                            dologin();
                        } else {
                            //  document.getElementById('spinnerdiv').style.visibility = "visible";
                            //  document.getElementById('buttontext').style.visibility = "hidden";
                            // document.getElementById('scatterhint').style.visibility = "hidden";

                            dologout();
                        }

                    } // loginclick

                    window.dologin = async() => {

                        try {
                            console.log("dologin...");
                            await ScatterJS.login();
                            var eos = null;
                            setStatus();
                            setInterval(() => {
                                setStatus();
                            }, 1000);
                            if (scatterobj) {
                                eos = scatterobj.eos(network, Eos);
                                eosobj = eos;

                            }

                        } catch (err) {

                            //     document.getElementById('spinnerdiv').style.visibility = "hidden";
                            //    document.getElementById('buttontext').style.visibility = "visible";

                            //             document.getElementById('scatterhint').style.visibility = "visible";
                            return Promise.reject(err);
                        }

                    }

                    window.dologout = async() => {

                        try {
                            await scatter.forgetIdentity();
                            scatter_account = "";
                            console.log("Scatter logout2");
                            document.getElementById('accountname').innerHTML = "...";
                            //        document.getElementById('balance').innerHTML = "";
                            //    document.getElementById('balancesov').innerHTML = "";
                            //     document.getElementById('sov_liquid').innerHTML = "";
                            //     document.getElementById('sov_genesisinfo').innerHTML = "";

                            document.getElementById('buttontext').innerHTML = "Login ";
                            //        document.getElementById('scatterhint').style.visibility = "visible";
                        } catch (err) {

                            return Promise.reject(err);
                        }
                    }

                    // var scatter = null;
                    // var eos = null;

                    const setStatus = () => {

                        if (!scatter) {
                            return
                        }

                        // get accountname
                        const account = ScatterJS.account('eos');

                        if (account != undefined) {
                            scatter_account = account.name;

                            document.getElementById('buttontext').innerHTML = "Logout";

                            console.log(scatter_account + " is logged in");

                        } else {
                            scatter_account = "";

                            console.log("NO-ACCOUNT");
                            return
                        }

                        get_balance();

                        document.getElementById('accountname').innerHTML = "" + scatter_account;


                        document.getElementById('buttontext').style.visibility = "visible";

                    };
                    // setStatus()

                    ScatterJS.connect('SOVDEX', {
                        network
                    }).then(connected => {
                        if (!connected)
                            return false;
                        scatter = ScatterJS.scatter;
                        scatterobj = scatter;
                        eosobject = scatter.eos(network, Eos);
                        scatter.addEventHandler((event, payload) => {
                        });
                    });

                    dologin();
                    app_thread();


// SCATTER END ---------------------------

function showVal(val) {


                        document.getElementById('dotransaction_bundle').innerHTML = "Burn Mine X " + val;


                    }

function showValCPU(val) {



                        document.getElementById('do_cpu_transaction_bundle').innerHTML = "SVX/CPU Mine X " + val;

                    }

function showValSOVCPU(val) {



                        document.getElementById('do_sov_cpu_transaction_bundle').innerHTML = "SOV/CPU Mine X " + val;

                    }

function showValBTCCPU(val) {



                        document.getElementById('do_btc_cpu_transaction_bundle').innerHTML = "BTC/CPU Mine X " + val;

                    }


                    function svx_to_stake_action() {

                        var svx_store_amount = document.getElementById('svx_to_stake').value;
                        alert("Stake " + svx_store_amount + " SVX");
                        svx_store_amount = format_eos_amount(svx_store_amount);
                        svx_store_amount = svx_store_amount + " SVX";

                        eosobject.transaction({
                            actions: [{
                                account: 'svxmintofeos',
                                //      name: 'admin2',
                                name: 'stake',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "account": scatter_account,
                                    "value": svx_store_amount
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    } // svx_to_stake_action

                    function svx_to_unstake_action() {

                        var svx_unstake_amount = document.getElementById('svx_to_unstake').value;
                        alert("Unstake " + svx_unstake_amount);
                        svx_unstake_amount = format_eos_amount(svx_unstake_amount);
                        svx_unstake_amount = svx_unstake_amount + " SVX";

                        eosobject.transaction({
                            actions: [{
                                account: 'svxmintofeos',
                                //      name: 'admin2',
                                name: 'unstake',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "account": scatter_account,
                                    "value": svx_unstake_amount
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }


                     function rentCPUSOV() {

                        var transfer_amount = document.getElementById('sovresourcesInput').value;
                        alert("Send " + transfer_amount + " SOV to Rent CPU");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovresources',
                                    "quantity": transfer_amount,
                                    "memo": 'Rent CPU'
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }

                    function rentNETSOV() {

                        var transfer_amount = document.getElementById('sovresourcesInput').value;
                        alert("Send " + transfer_amount + " SOV to Rent NET");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovresources',
                                    "quantity": transfer_amount,
                                    "memo": 'Rent NET'
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }

                    function buyRAMSOV() {

                        var transfer_amount = document.getElementById('sovresourcesInput').value;
                        alert("Send " + transfer_amount + " SOV to Buy RAM");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovresources',
                                    "quantity": transfer_amount,
                                    "memo": 'Buy RAM'
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }


                    function buySOVEOS() {

                        var transfer_amount = document.getElementById('eos_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " EOS for SOV");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " EOS";

                        eosobject.transaction({
                            actions: [{
                                account: 'eosio.token',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'SOV',
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }

                    function sellSOVEOS() {

                        var transfer_amount = document.getElementById('sov_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " SOV for EOS");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'EOS',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }



                    function buySVXEOS() {

                        var transfer_amount = document.getElementById('eos_transfer_amount1').value;
                        alert("Exchange " + transfer_amount + " EOS for SVX");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " EOS";

                        eosobject.transaction({
                            actions: [{
                                account: 'eosio.token',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'SVX',
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }

                    function sellSVXEOS() {

                        var transfer_amount = document.getElementById('svx_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " SVX for EOS");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SVX";

                        eosobject.transaction({
                            actions: [{
                                account: 'svxmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'EOS',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }

                    function buySOVUSDT() {

                        var transfer_amount = document.getElementById('usdt_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " USDT for SOV");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " USDT";

                        eosobject.transaction({
                            actions: [{
                                account: 'tethertether',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'SOV',
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }



                    function sellSOVUSDT() {

                        var transfer_amount = document.getElementById('sov_transfer_amount10').value;
                        alert("Exchange " + transfer_amount + " SOV for USDT");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'USDT',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }

                    function buyEOSPBTC() {

                        var transfer_amount = document.getElementById('pbtc_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " pBTC for EOS");
                        transfer_amount = format_btc_amount(transfer_amount);
                        transfer_amount = transfer_amount + " PBTC";

                        eosobject.transaction({
                            actions: [{
                                account: 'btc.ptokens',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'EOS',
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }



                    function sellEOSPBTC() {

                        var transfer_amount = document.getElementById('eos_transfer_amount2').value;
                        alert("Exchange " + transfer_amount + " EOS for pBTC");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " EOS";

                        eosobject.transaction({
                            actions: [{
                                account: 'eosio.token',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'PBTC',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }



                    function buyPOWPBTC() {

                        var transfer_amount = document.getElementById('pbtc_transfer_amount1').value;
                        alert("Exchange " + transfer_amount + " pBTC for POW");
                        transfer_amount = format_btc_amount(transfer_amount);
                        transfer_amount = transfer_amount + " PBTC";

                        eosobject.transaction({
                            actions: [{
                                account: 'btc.ptokens',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],

                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'POW',
                                }

                            }]
                        }).then(result => {

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }



                    function sellPOWPBTC() {

                        var transfer_amount = document.getElementById('pow_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " POW for pBTC");
                        transfer_amount = format_btc_amount(transfer_amount);
                        transfer_amount = transfer_amount + " POW";

                        eosobject.transaction({
                            actions: [{
                                account: 'eosiopowcoin',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'PBTC',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }
