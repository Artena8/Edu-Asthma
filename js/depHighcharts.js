Highcharts.setOptions({
    lang: {
        months: [
            'Janvier', 'Février', 'Mars', 'Avril',
            'Mai', 'Juin', 'Juillet', 'Août',
            'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        weekdays: [
            'D', 'L', 'M', 'M', 'J', 'V', 'S'
        ]
    }
});

const chartsDep = [[96, 85, 91],[96, 85, 91,41],[96, 85, 91,72],[96, 85, 91, 72, 71, 70],[96, 85, 91, 72, 32]];
let i = 0 ;

$(document).ready(function(){
    graphDEP(chartsDep[i]);
});

$('.pre').on('click', function(){
    if(i >= chartsDep.length - 1) {i = 0} else {i++;};
    console.log(i);
    graphDEP(chartsDep[i]);
});

$('.nxt').on('click', function(){
    if(i <= 0) {i = 0} else {i--;};
    console.log(i);
    graphDEP(chartsDep[i]);
});

function graphDEP(dataArray){
    Highcharts.chart('container', {
        chart: {
            type: 'spline',
    
        },
        exporting: { 
            enabled: false 
        },
        title: {
            text: 'Courbe DEP',
            align: 'left'
        },
    
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%A', this.value);
                }
            },
            min: Date.UTC(2010, 0, 0),
            max: Date.UTC(2010, 0, 13),
        },
        plotOptions: {
            series: {
                lineWidth: 5,
                shadow: true,
                label: '',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            }
        },
        yAxis: {
            title: {
                text: 'taux DEP'
            },
            max : 100,
            min: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [{ // ZONE Orange
                from: 0,
                to: 60,
                color: '#DF6908ff',
                label: {
                    text: 'Orange',
                    style: {
                        color: 'red'
                    }
                }
            }, { // ZONE JAUNE
                from: 60,
                to: 80,
                color: '#FEC000ff',
                label: {
                    text: 'Jaune',
                    style: {
                        color: '#DF6908ff'
                    }
                }
            }, { // ZONE VERTE
                from: 80,
                to: 100,
                color: '#035829ff',
                label: {
                    text: 'Vert',
                    style: {
                        color: 'lime'
                    }
                }
            }]
        },
        tooltip: {
            enabled : false
        },
        series: [{
            name: 'DEP',
            color: "#FFFFFF",
            data: dataArray,
            //[
                // PHASE 1 - 96, 85, 91
                // PHASE 2 - 96, 85, 91, 41
                // PHASE 3 - 96, 85, 91, 72
                // PHASE 4 - 96, 85, 91, 72, 71, 70
                //96, 85, 91, 72, 32
            //],
            labels: {
                format : ''
            },
            pointStart: Date.UTC(2010, 0, 2),
            pointInterval: 24 * 3600 * 1000
        }]
    });
}



