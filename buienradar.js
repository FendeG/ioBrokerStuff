



  try {
            require("request")('https://gpsgadget.buienradar.nl/data/raintext?lat=52&lon=6.5', function (error, response, result) {
                console.log(result);
                v = result.split('\r\n');
                console.log(v)
;                console.log( typeof result);
                let rain = 0;
                let time = ''
                for (let i = 0; i < v.length; i++) {
                    let value = result[i].split('|');
                    if (Number(value[0]) > 20) {
                        if (rain === 0) {
                            rain++;
                            time = value[1];
                            isRaining = true;
                        } else {
                            break;
                        }

                    } else {
                        rain = 0;
                        time = ''
                    }
                    // console.log(value);

                }
                if (rain > 0) {
                    console.log('Het gaat regenen  ' + time);
                    let txt = 'Het gaat regenen  ' + String(time)
                    sayIt(txt, 'eetkamer', 40);
                    rain = 0;
                    sendTo("telegram.0", "send", {
                        text: txt
                    });
                }



            })
                .on("error", function (e) { console.error(e); });
        } catch (e) { console.error(e); }