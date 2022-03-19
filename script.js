(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
        c.style.color = "red";
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 500);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours() % 12 || 12;
            let m = date.getMinutes();
            let s = date.getSeconds();

            let h24 = date.getHours();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            let b;
            if (h24 < 10) {
                let b = "AM";
            } else {
                b = "PM";
            }
        
       
            c.innerHTML = h + ":" + m + ":" + s + " " + b;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let nimi = [];
        nimi.push(eesnimi.value);
        nimi.push(perenimi.value);
        

        function nameCheck() {
            
            for (let i = 0; i < nimi.length; i++) {
                for (let v = 0; v < nimi[i].length; v++) {
                    let h = nimi[i][v];
                    let k = isFinite(h);
                    if (k === true) {
                        return false;
                    }
                }
            }
        }
        

        function radioOn() {
            let radio1 = document.getElementById("r1").checked;
            let radio2 = document.getElementById("r2").checked;

            if (radio1 === true) {
                return true;
            } else if (radio2 === true) {
                return true;
            } else {
                return false;
            }
        }


        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
        } else if (radioOn() === false) {

            alert("Palun täitke kõik väljad korrektselt");

            return;

        }  else if (nameCheck() === false) {

            alert("Palun täitke kõik väljad korrektselt");

            return;

        } else if (eesnimi.value === "") {

            alert("Palun täitke kõik väljad korrektselt");
            
            eesnimi.focus();

            return;

        } else if (perenimi.value === "") {

            alert("Palun täitke kõik väljad korrektselt");
            
            perenimi.focus();

            return;

        } else if (linn.value === "tln") {

            e.innerHTML = "0.00 &euro;";

            return;

        } else if (linn.value === "trt") {

            e.innerHTML = "2.5 &euro;";

            return;

        } else if (linn.value === "nrv") {

            e.innerHTML = "2.5 &euro;";

            return;

        } else {
            
            e.innerHTML = "3.00 &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

//let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";
let mapAPIKey = "AoJ_VpiJhtMIMmsj-qlta6eKr4_F5rmFmegRwqxBBN5-UdVsLISNm_96NGF29XGC";

let map;

function GetMap() {
    
    "use strict";

    let centerPointTartu = new Microsoft.Maps.Location(
        58.38104, 
        26.71992
        );

    let centerPointLiiva = new Microsoft.Maps.Location(
        58.53973,
        23.01958
        );

    let mapCenterPoint = new Microsoft.Maps.Location(
        58.23438,
        24.77417
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: mapCenterPoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    
    
    let pushpinT = new Microsoft.Maps.Pushpin(centerPointTartu, {
        enableClickedStyle: true,
        title: 'Tartu Ülikool',
        });

    Microsoft.Maps.Events.addHandler(pushpinT, 'click', pushpinClicked);
    
    map.entities.push(pushpinT);

    let pushpinL = new Microsoft.Maps.Pushpin(centerPointLiiva, {
        enableClickedStyle: true,
        title: 'Liiva',
    });

    map.entities.push(pushpinL);

    let infoboxT = new Microsoft.Maps.Infobox(centerPointTartu, {
        visible: true,
        title: 'Ülikool',

    });

    let infoboxL = new Microsoft.Maps.Infobox(centerPointLiiva, {
        visible: false,
        title: 'Saaremaa',

    });

    map.entities.push(infoboxT);
    map.entities.push(infoboxL);

    Microsoft.Maps.Events.addHandler(pushpinL, 'click', pushpinClicked(pushpinL));
    Microsoft.Maps.Events.addHandler(pushpinT, 'click', pushpinClicked(pushpinT));


}

function pushpinClicked(e) {
    e.setOptions({
        visible: true
    });
    
}




// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

