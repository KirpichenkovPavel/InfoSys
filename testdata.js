/**
 * Created by pavel on 06.04.16.
 */
var dat = {
    nodes: [],
    links: []
};
function div(a,b) {
    return (a-(a%b))/b;
}
var nodenum = 100;
function makenodes() {
    for (var i = 0; i < nodenum; i = i + 1) {
        dat.nodes.push(
            {x: i%(div(nodenum,10)),
             y: 10*div(i,div(nodenum,10))});
    }
}
function generateTree() {
    var root = {children:[], name: "SPbPU",_children:null,level:0};
    for (var i = 0; i< 15; i++){
        root.children[i]= {
            _children: [],
            children: null,
            name: "faculty_" + i,
            level:1
        };
        for (var j = 0; j <10; j++){
            root.children[i]._children[j] = {
                children: null,
               _children: [],
                name: "cathedra_" +i+"_"+j,
                level:2
            };
            for (var k = 0; k<10; k++){
                root.children[i]._children[j]._children[k] = {name:"employee_"+i+"_"+j+"_"+k,level:3};
            }
        }
    }
    return root;
}
function makelinks() {
    /*var ind = 0;
    for (i = 0; i<div(nodenum,10);i++) {
        for (var j = 0; j < 9; j=j+2) {
            for (var k = j + 1; k < 10; k++) {
                var link = {
                    source: 10 * i + j,
                    target: 10 * i + k
                };

                dat.links.push(link);

                if (dat.links[ind].source === undefined || dat.links[ind].target === undefined)
                    alert(String(i)+ " "+String(j)+" " +String(k)+ " index = "+String(ind));
                ind = ind + 1;
            }
        }
        if (i != div(nodenum,10)-1) {
            dat.links.push({source: 10 * i, target: 10 * (i + 1)});

            if (dat.links[ind].source === undefined || dat.links[ind].target === undefined)
                alert(String(i)+ " "+String(j)+" " +String(k)+ " index = "+String(ind));
            ind = ind + 1;
        }
    }*/
}


function generate_data() {
    makelinks();
    makenodes();    
}

function chart1() {
    var width = 1024,
        height = 968;
    


    var force = d3.layout.force()
        .size([width, height])
        .on("tick",tick);

    var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

    var link = svg.selectAll(".link");
    var node = svg.selectAll(".node");

    update();

    function update() {
        var nodes = dat.nodes;
        var links = dat.links;

        force
            .nodes(nodes)
            .links(links)
            .start();

        link = link.data(links,function (d) {return d;});
        link.enter().append("line")
            .attr("class", "link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node = node.data(nodes,function (d) {return d;});
        node.enter().append("circle")
            .attr("class", "node")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("r", 5);

            //.on("click", click)
    }
    function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y;});
    }

    force.start();
}