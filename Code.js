/*
Most of this code was written without an internet connection and is just a frankenstein of example code. 
It is very messy. I don't care to clean it up.
*/



var teamRanks = [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 
    [8, 8, 9, 9, 8, 9, 9, 9, 9, 9, 8, 9, 9, 7], 
    [7, 6, 5, 4, 7, 4, 7, 8, 5, 4, 6, 7, 5, 4], 
    [9, 9, 8, 8, 9, 8, 8, 6, 7, 6, 4, 4, 2, 3], 
    [1, 4, 7, 6, 3, 2, 3, 2, 1, 2, 2, 1, 1, 1], 
    [2, 1, 1, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 2], 
    [3, 2, 4, 7, 6, 7, 6, 7, 8, 7, 9, 8, 6, 9], 
    [6, 5, 3, 5, 4, 6, 4, 3, 2, 1, 1, 2, 4, 6], 
    [5, 3, 2, 1, 2, 5, 2, 4, 6, 8, 7, 5, 7, 5], 
    [4, 7, 6, 2, 5, 3, 5, 5, 4, 5, 5, 6, 8, 8]
];

var teamRanksAdj = [[6.68, 8.34, 8.34, 9.17, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [6.34, 8, 8.17, 9, 8, 9, 9, 9, 9, 9, 8, 9, 8.17, 6.17], [6.17, 4.34, 3.34, 2.34, 3.68, 2.34, 3.68, 5.51, 4.17, 2.34, 2.68, 6.17, 3.34, 1.51], [6.51, 8.17, 8, 8, 8.17, 8, 8, 5.17, 7, 5.17, 2.34, 1.51, 1.17, 1.34], [1, 4, 7, 5.17, 3, 2, 3, 2, 1, 2, 2, 1, 1, 1], [1.17, 1, 1, 2.17, 1, 1, 1, 1, 1.34, 2.17, 2.17, 1.34, 3, 1.17], [1.34, 1.17, 3.17, 5.34, 3.51, 6.17, 3.51, 5.34, 7.17, 5.34, 8.17, 6.34, 3.51, 6.51], [6, 4.17, 3, 5, 3.17, 6, 3.17, 2.17, 1.17, 1, 1, 1.17, 3.17, 6], [1.68, 1.34, 1.17, 1, 1.17, 2.51, 1.17, 2.34, 4.34, 5.51, 2.85, 1.68, 3.68, 1.68], [1.51, 4.51, 3.51, 2, 3.34, 2.17, 3.34, 5, 4, 5, 2.51, 6, 8, 6.34]];

var waiverClaims = [17, 21, 19, 12, 16, 23, 1, 16, 29, 8];

var intimidationFactor = [-3.54, 3.2, -2.57, -4.51, -4.02, 7.86, 6.83, -4.57, 0.24, 1.08];
var bestDraftData = [1735.26, 1869.6, 1854.86, 1962.22, 2301.8, 1826.44, 2163.14, 1979.6, 1641.68, 2149.52];
var pointsOffPerfect = [303.92, 203.7, 319.72, 150.7, 207.2, 235.64, 374.2, 162.3, 250.74, 239.8];


//The symbol for the person
function TeamDot(person)
{
    return d3.symbolCircle;
}











//make the svg and the graphs
function make(){
    
     // set the dimensions and margins of the graph
    var margin = { top: 100, right: 120, bottom: 100, left: 60 },
    width = 1300 - margin.left - margin.right,
    height = 2400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    //add background
    svg.append("rect")
    .attr("width", "" + 100 + "%")
    .attr("height", "" + 100 + "%")
    .attr("fill", "#12664F");

    var imgHeight = 160;

    svg.append('image')
    .attr('xlink:href', 'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/ChampionshipImg.png')
    .attr('width', imgHeight*1.823)
    .attr('height', imgHeight)
    .attr('x', 600)
    .attr('y', 0)

    
    writeText(25, 100, 60, svg, "ADC Boston FF", "#E4701E")
    writeText(25, 120, 15, svg, "*See Bottom Of Page For Stat Explanations")

    var topMargin = 100;
    var barStart = 1100;
    var barWidth = [100, 100, 100, 100, 100];
    var barMargin = 90;

    LinePlots(svg, topMargin + 50, topMargin + 500, 50, 1000, teamRanks, "Team Rank", 30);
    LinePlots(svg, topMargin + 550, topMargin + 1000, 50, 1000, teamRanksAdj, "Team Rank Clustered By Ties", 10);
    BarPlots(svg, topMargin + barStart, topMargin + barStart + barWidth[0], 25, 975, [waiverClaims], ["#E0FF4F"], "Waiver Claims", 7, 5, 0);
    BarPlots(svg, topMargin + barStart + barMargin + barWidth[0], topMargin + barStart + barMargin + barWidth[0] + barWidth[1], 25, 975, [intimidationFactor], ["#ff2E00"], "Intimidation Factor", 7, 2, -4);
    BarPlots(svg, topMargin + barStart + barMargin*2 + barWidth[0] + barWidth[1], topMargin + barStart + barMargin*2 + barWidth[0] + barWidth[1] + barWidth[2], 25, 975, [bestDraftData], ["#ABDAE1"], "Best Draft", 9, 300, 0);
    BarPlots(svg, topMargin + barStart + barMargin*3 + barWidth[0] + barWidth[1] + barWidth[2], topMargin + barStart + barMargin*3 + barWidth[0] + barWidth[1] + barWidth[2] + barWidth[3], 25, 975, [pointsOffPerfect], ["#7B506F"], "Points Off Perfect", 9, 50, 0);
    Explintons(svg, topMargin + barStart + barMargin*3 + barWidth[0] + barWidth[1] + barWidth[2] + barWidth[3]+100);
}

function Explintons(bg, top){
    var fontSize = 20;
    var left = 25;
    var textLineHight = 25;
    var tabSpace = 50;

    writeText(left, top, fontSize, bg,
        "All data is from the regular season, weeks 1-14. (playoff data is excluded)"
    )

    writeText(left, top + textLineHight*2, fontSize, bg,
        "Intimidation Factor: Average of (Week X Opponent's Score - Week X Opponent's Average Score)"
    )
    writeText(left + tabSpace, top + textLineHight*3, fontSize, bg,
        "How much your opponents under-preformed when playing you.(negative number means they over-preformed)"
    )
    
    writeText(left, top + textLineHight*5, fontSize, bg,
        "Best Draft: Sum of points scored by all draft picks."
    )

    writeText(left, top + textLineHight*7, fontSize, bg,
        "Points Off Perfect: How many more points could have been scored if the lineup was set perfectly(excluding waiver claims)"
    )
    writeText(left + tabSpace, top + textLineHight*8, fontSize, bg,
        "In other words if you could predict the future how many more points could you have scored."
    )




}

function writeText(left, top, fontSize, bg, text, color="#000000"){
    bg.append("text")
    .attr("class", "placeUpdate")
    .attr("font-size", "" + fontSize + "px")
    .attr("x", left)
    .attr("y", top)
    .style("text-anchor", "right")
    .style("fill", color)
    .text(text)
 
}

var teamColors = ["#DDB265","#4DC8EE","#928A7A","#AE74B4","#468CA5","#8B1722","#DEDCDA","#F47939","#0B5DC3","#6F5841"]
var teamImgs = ['https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/HosTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/CDsTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/MergeTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/MVPsTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/KamaraTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/CookTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/ProfTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/DetTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/StroudTS.png',
    'https://raw.githubusercontent.com/efschwarzrock/PP-FF-Data-Vis/master/BrillsTS.png'
]

function BarPlots(bg, top, bottom, left, right, data, barColors, titleName, numLines, interval, startLine){
    
    var fontSize = 20;
    var dotWidth = 20;
    var dotShift = 10;
    var lineWidth = 3;
    var textOffset = 15;
    var labelSize = 15;

    var width = right - left;
    var height = bottom - top;
    
    var tempData = CreateBarData(data[0])
    // Add X axis
    var x = d3.scaleBand()
            .domain(tempData.map(function(d) { return d[0];}))
            .range([0, width])
            .padding(1-1/(data.length+1));
            
    // Add Y axis
    var y = d3.scaleLinear()
            .domain([Math.min(0,...data.flat()), Math.max(...data.flat())])
            .range([height, 0]);

    var markerData = []
    for(i = 0; i < numLines; i++){
        var markData = [[startLine + interval*i, 0], [startLine + interval*i, 1]];
        markerData.push(markData);
    }
    var line = d3.line()
    .x(function(d) { return (d[1]+.04)*width*.95 + left; }) // set the x values for the line generator
    .y(function(d) { return y(d[0]) + top; }) // set the y values for the line generator 
    
    for(i = 0; i < markerData.length; i++){
        
        bg.append("path")
        .datum(markerData[i]) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "#333333")
        .attr("fill", "#00000000")
        .attr("stroke-width", lineWidth)
        .attr("d", line) // 11. Calls the line generator
        
        bg.append("text")
        .attr("class", "placeUpdate")
        .attr("font-size", "" + labelSize + "px")
        .attr("x", left)
        .attr("y", y(markerData[i][0][0]) + top + labelSize/3)
        .style("text-anchor", "right")
        .style("fill", "#000000")
        .text(markerData[i][0][0])        


    }
        
    for(k = 0; k < data.length; k++){
        var barData = CreateBarData(data[k])
        bg.selectAll("sdf")
        .data(barData)
        .enter()
        .append("rect")
            .attr("x", function(p) { return x(p[0]) + left + (x.bandwidth()*k); })
            .attr("y", function(p) { return Math.min(y(p[1]), y(0)) + top; })
            .attr("width", x.bandwidth())
            .attr("height", function(p) { return Math.abs(y(0) - y(p[1])); })
            .attr("fill", barColors[k]);
    }

    bg.append('g')
    .selectAll("dot")
    .data(tempData)
    .enter()
    .append("image")
    .attr('xlink:href', d => teamImgs[d[0]])
    .attr('width', 30)
    .attr('height', 30)
    .attr('x', d => (x(d[0]) + left + (x.bandwidth()*data.length*0.5)) - 15)
    .attr('y', (bottom + dotShift))
    /*
    .attr("class", "SolidUpdate")
    .attr("d", d3.symbol().size(dotWidth))
    .style("fill", d => teamColors[d[0]])
    .attr("transform", d => "translate(" + (x(d[0]) + left + (x.bandwidth()*data.length*0.5)) + "," + (bottom + dotShift) + ")")*/

    bg.append("text")
    .attr("class", "placeUpdate")
    .attr("font-size", "" + fontSize + "px")
    .attr("x", left)
    .attr("y", top-textOffset)
    .style("text-anchor", "right")
    .style("fill", "#000000")
    .text(titleName)
}

function CreateBarData(data){
    var barData = []
    for(i = 0; i < data.length; i++){
        barData.push([i, data[i]])
    }
    return barData;
}


//add the death vs time line graph
function LinePlots(bg, top, bottom, left, right, data, titleName, imgSize){
    
    var lineWidth = 3;
    var dotWidth = 20;
    var dotShift = 30;
    var fontSize = 20;

    //the svg symbols for the points
    //var symbol = d3.symbol().size([dotSize]);

    var width = right - left;
    var height = bottom - top;
    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, data[0].length])
    .range([0, width]);
    
    // Add Y axis
    var y = d3.scaleLinear()
            .domain([data.length, 0])
            .range([height, 0]);
    
    //line graph function
    //code gotten from https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
    var line = d3.line()
    .x(function(d) { return x(d[1]) + left; }) // set the x values for the line generator
    .y(function(d) { return y(d[0]) + top; }) // set the y values for the line generator 

    var markerData = []
    for(i = 0; i < data.length; i++){
        var markData = [];
        for(j = 0; j < data[i].length; j++){
            markData.push(i+1);
        }
        markerData.push(markData);
    }
    
    var genMarkData = generateData(markerData);
    for(i = 0; i < genMarkData.length; i++){
        
        bg.append("path")
        .datum(genMarkData[i]) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", "#333333")
        .attr("fill", "#00000000")
        .attr("stroke-width", lineWidth/2)
        .attr("d", line) // 11. Calls the line generator 
    }

    var genData = generateData(data);
            
//code gotten from https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
            
    for(i = 0; i < genData.length; i++){
        bg.append("path")
        .datum(genData[i]) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("stroke", teamColors[i])
        .attr("fill", "#00000000")
        .attr("stroke-width", lineWidth)
        .attr("d", line) // 11. Calls the line generator 
    }

    var orderData = generateOrderData(data);

    // Add dots
    //base dots (selected dots)
    bg.append('g')
    .selectAll("dot")
    .data(orderData)
    .enter()
    .append("image")
    .attr('xlink:href', d => teamImgs[d[1]])
    .attr('width', imgSize)
    .attr('height', imgSize)
    .attr('x', x(0) + left - dotShift - imgSize/2)
    .attr('y', d => (y(d[0]) + top - imgSize/2))

    bg.append("text")
    .attr("class", "placeUpdate")
    .attr("font-size", "" + fontSize + "px")
    .attr("x", left)
    .attr("y", top+20)
    .style("text-anchor", "right")
    .style("fill", "#000000")
    .text(titleName)
   
}

function generateData(data)
{
    var flatScale = .15;
    genData = [];
    for(i = 0; i < data.length; i++){
        teamData = [];
        for(j = 0; j < data[i].length; j++){
            teamData.push([data[i][j], j - flatScale])
            teamData.push([data[i][j], j + flatScale])
        }
        genData.push(teamData);
    }
    return genData;
}

function generateOrderData(data)
{
    firstWeekData = [];
    for(i = 0; i < data.length; i++){
        firstWeekData.push([data[i][0], i])
    }

    return firstWeekData;
}


