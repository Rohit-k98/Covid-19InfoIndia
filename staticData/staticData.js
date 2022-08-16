let optionIds = ['allSates', 'topFive', 'lowestFive'];
let covidRegionalData = [];
let top5 = [];
let lowest5 = [];
function getDetails(selectedId) {

    if (selectedId === 'allSates') {
        updateCovidData(covidRegionalData);
    }
    if (selectedId === 'topFive') {
        getTopStates();
    }
    if (selectedId === 'lowestFive') {
        getLowestState();
    }
    optionIds.forEach((id) => {
        if (id === selectedId) {
            document.getElementById(id).classList.replace('btn-secondary', 'btn-info');
        }
        else {
            document.getElementById(id).classList.replace('btn-info', 'btn-secondary');
        }
    })
}


function getTopStates() {
    document.getElementById('covidContainer').innerHTML = ''
    let covidcontainer = `<div class="row rounded shadow-lg p-2 w-50 m-2 vh-">
    <div class="col-sm-3"><strong>State</strong></div>
    <div class="col-sm-3"><strong>Total Case</strong></div>
    <div class="col-sm-3"><strong>Active Case</strong></div>
    <div class="col-sm-3"><strong>Deaths</strong></div>`;
    top5 = [...covidRegionalData]
    top5.sort((a, b) => {
        return b.confirmedCasesIndian - a.confirmedCasesIndian;
    })
        .slice(0, 5)
        .forEach((stateData, index, covidArray) => {
            covidcontainer += `<div class="row rounded bg-grey shadow-lg p-2 w-100 m-2"  onClick="addChart(${index},'top5');getStateDetails(${index})"  id=${`stateData${index}`}>
        <div class="col-sm-3">${stateData.loc.length > 25 ? stateData.loc.slice(0, 17) + '...' : stateData.loc}</div>
        <div class="col-sm-3">${stateData.confirmedCasesIndian}</div>
        <div class="col-sm-3">${stateData.confirmedCasesIndian - stateData.discharged - stateData.deaths}</div>
        <div class="col-sm-3">${stateData.deaths}</div>
    </div>`
        })
    covidcontainer += `</div>`
    covidcontainer += `<div style="position:absolute; top:65px;right:20px ;width:38vw;height:600px" id="main"></div>`
    //document.getElementById('covidContainer').appendChild(grp);
    document.getElementById('covidContainer').innerHTML = covidcontainer;
    this.addChart(0, 'top5')
}

function getLowestState() {
    document.getElementById('covidContainer').innerHTML = ''
    let covidcontainer = `<div class="row rounded shadow-lg p-2 w-50 m-2">
    <div class="col-sm-3"><strong>State</strong></div>
    <div class="col-sm-3"><strong>Total Case</strong></div>
    <div class="col-sm-3"><strong>Active Case</strong></div>
    <div class="col-sm-3"><strong>Deaths</strong></div>`;
    lowest5 = [...covidRegionalData]
    lowest5.sort((a, b) => {
        return a.confirmedCasesIndian - b.confirmedCasesIndian;
    })
        .slice(0, 5)
        .forEach((stateData, index, covidArray) => {
            covidcontainer += `<div class="row rounded bg-grey shadow-lg p-2 w-100 m-2" onClick="addChart(${index},'lowest5');getStateDetails(${index})"  id=${`stateData${index}`}>
        <div class="col-sm-3">${stateData.loc.length > 25 ? stateData.loc.slice(0, 17) + '...' : stateData.loc}</div>
        <div class="col-sm-3">${stateData.confirmedCasesIndian}</div>
        <div class="col-sm-3">${stateData.confirmedCasesIndian - stateData.discharged - stateData.deaths}</div>
        <div class="col-sm-3">${stateData.deaths}</div>
    </div>`
        })
    covidcontainer += `</div>`
    covidcontainer += `<div style="border:2px solid black; position:absolute; top:65px;right:20px ;width:38vw;height:600px" id="main">fgdbcdsffcvkjndbvihj</div>`
    //document.getElementById('covidContainer').appendChild(grp);
    document.getElementById('covidContainer').innerHTML = covidcontainer;
    addChart(0, 'lowest5');
}

function filterState(id) {
    console.log(document.getElementById(id).value);
}

fetch(`https://api.rootnet.in/covid19-in/stats/latest`)
    .then((res) => res.json())
    .then((covid) => {
        console.log(covid);
        covidRegionalData = covid.data.regional;
        console.log(covidRegionalData);
        updateCovidData(covidRegionalData);
    })
    .catch((err) => {
        console.log(err);
    })
// {
//     fetch(`http.//api/stats/latest`).
//     then((res)=> res.json)
//     .then( (data)=>{
//         console.log(data);
//         let storeHere=data.something;
//     })
// }


function updateCovidData(covidRegionalData) {
    let covidcontainer = `<div class="row rounded shadow-lg p-2 w-50 m-2">
    <div class="col-sm-3"><strong>State</strong></div>
    <div class="col-sm-3"><strong>Total Case</strong></div>
    <div class="col-sm-3"><strong>Active Case</strong></div>
    <div class="col-sm-3"><strong>Deaths</strong></div>`;
    covidRegionalData.forEach((stateData, index, covidArray) => {
        covidcontainer += `<div class="row rounded bg-grey shadow-lg p-2 w-100 m-2" onClick="addChart(${index},'all');getStateDetails(${index})"  id=${`stateData${index}`}>
        <div class="col-sm-3">${stateData.loc.length > 25 ? stateData.loc.slice(0, 17) + '...' : stateData.loc}</div>
        <div class="col-sm-3">${stateData.confirmedCasesIndian}</div>
        <div class="col-sm-3">${stateData.confirmedCasesIndian - stateData.discharged - stateData.deaths}</div>
        <div class="col-sm-3">${stateData.deaths}</div>
    </div>`
    })
    covidcontainer += `</div>`
    covidcontainer += `<div style="position:absolute; top:65px;right:20px ;width:38vw;height:600px" class="shadow-lg" id="main">fgdbcdsffcvkjndbvihj</div>`
    //document.getElementById('covidContainer').appendChild(grp);
    document.getElementById('covidContainer').innerHTML = covidcontainer;
    addChart(0, 'all');

}

function getStateDetails(index) {
    covidRegionalData.forEach((stateData, stateIndex) => {
        if (stateIndex === index) {
            document.getElementById(`stateData${stateIndex}`).classList.add('bg-info');
        }
        else {
            document.getElementById(`stateData${stateIndex}`).classList.remove('bg-info');
        }
    });
}
function addChart(index, category) {
    let stateData;
    switch (category) {
        case 'top5': {
            stateData = top5[index];
            break;
        }
        case 'lowest5': {
            stateData = lowest5[index];
            break;
        }
        case 'all': {
            stateData = covidRegionalData[index];
            break;
        }
    }

    // Initialize the echarts instance based on the prepared dom
    var myChart = echarts.init(document.getElementById('main'));
    console.log("onClickWorking")
    // Specify the configuration items and data for the chart
    var option = {
        title: {
            text: stateData.loc
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '5%',
            left: '0'
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [
            {
                name: 'Covid-India',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: stateData.confirmedCasesIndian / 100, name: 'Total Case(x100)' },
                    { value: stateData.discharged / 100, name: 'Discharged(x100)' },
                    { value: stateData.confirmedCasesIndian - stateData.discharged - stateData.deaths, name: 'Active' },
                    { value: stateData.deaths, name: 'Total Deaths' },
                    { value: stateData.confirmedCasesForeign, name: 'Outsiders' }

                ]
            }
        ]
    };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
}