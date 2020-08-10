let v = ['000|20:45',
    '000|20:50',
    '000|20:55',
    '000|21:00',
    '050|21:05',
    '000|21:10',
    '000|21:15',
    '000|21:20',
    '000|21:25',
    '000|21:30',
    '000|21:35',
    '000|21:40',
    '000|21:45',
    '000|21:50',
    '000|21:55',
    '000|22:00',
    '000|22:05',
    '000|22:10',
    '000|22:15',
    '000|22:20',
    '000|22:25',
    '000|22:30',
    '000|22:35',
    '000|22:40',
    ''
];
if (v && v.length > 5) {
    l = v.length;
} else {
    return;
}

async function getRain(startI, stopI) {
    let rainValue = 0;
    for (i = startI; i < (stopI + 1); i++) {
        // console.log('i : ' + i)
        let value = v[i].split('|');
        rainValue = rainValue + Number(value[0]);
    }
    return rainValue;
}

async function main() {
    try {
        rain = await getRain(0, 1);
        if (rain > 0) {
            console.log('Raining')
            return '';
        }

        rain = await getRain(3, 5);

        if (rain < 10) {
            kans = '';
        } else if (rain < 50) {
            kans = 'Kleine kans op regen';
        } else if (rain < 100) {
            kans = 'Redelijk kans op regen'
        } else if (rain < 200) {
            kans = 'Zeer grote kant op regenen'
        } else {
            kans = 'Het gaat regenen'
        }

        if (kans) {
            console.log('Over 15 minuten, ' + kans)
        }
        console.log('Rain : ' + rain);
    } catch (err) {
        console.log('Error : ' + JSON.stringify(err));
    }
}

main();