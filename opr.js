$(document).ready(function(){                                                                           //Ready function which loads the page when ready
    com=[];
    faults=[];
    flag=0;                                                                                                             //flag 0 for graph button
    $("#btn1").click(function(){                                                        
        if(flag==0){                                                                                                   
            flag=1;                                                                                                     //flag value will be updated when button is clicked
            document.querySelector(".btn1").textContent="Hide Graph";                 //"Show graph" will change to "Hide Graph"
            document.querySelector("#graph").innerHTML="<h5>Graph Showing Number of Faults for different Number of Frames</h5>";

            var can=document.createElement("canvas");                                          //Creating canvas in which we deploy the graph
            can.setAttribute("id","myChart");                                                           //Setting attributes
            document.querySelector(".chart-container").appendChild(can);                //Appending element
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {                                                                         //creating chart
                type: 'bar',                                                                                                //Type: bar
                data: {
                    labels: com,                                                                                            //Setting legends
                    datasets: [{
                        label: 'No. of Faults',                                                                         //label text
                        data: faults,                                                                                       
                        backgroundColor: '#bd963e',                                             //background color for label
                        borderColor:  'white',                                                        //border color for label
                        borderWidth: 1                                                                                      //setting border width
                    }]
                },
                options: {
                    animation: { 
                        duration: 7000,                                                                                     //y-axis animation when the graph loads
                        yAxis: true,
                    },
                    legend: {
                        labels: {
                            fontColor: 'white'                                                                             //font color for legend
                        }
                    },
                    scales: {
                        xAxes: [{                                                                                               // specs for x-axis
                            scaleLabel: {
                                display: true,
                                labelString: 'No.of Frames',                                                         // x-axis text
                                fontColor: "white"                                                                       // font color
                            },
                            gridLines: {
                                display: false,
                                color: "black"                                                                          // color of x-axis
                            },
                            ticks: {
                                fontColor: "white",                                                                     // font color of values on x-axis
                                stepSize: 1,                                                                                // mentioning stepsize for the graph
                                beginAtZero: true                                                                       // starts from 0
                            }
                        }],
                        // all attributes of y-axis are mentioned for x-axis as well
                        yAxes: [{
                            scaleLabel: {                                                                                       // specs for y-axis
                                display: true,
                                labelString: 'No. of Faults',                                                           //y-axis text
                                fontColor: "white"                                                                        // font color
                            },
                            gridLines: {
                                display: false,
                                color: "black"                                                                               // color of y-axis
                            },
                            ticks: {
                                fontColor: "white",                                                                     // font color of values on y-axis
                                stepSize: 1,                                                                                // mentioning stepsize for the graph
                                beginAtZero: true                                                                       // starts from 0
                            }
                        }]
                    }
                },
            });
        }
        //code for the case where graph shouldn't be displayed
        else{
            document.querySelector(".btn1").textContent="Show Graph";               //text changed from hide graph to show graph
            document.querySelector("#graph").innerHTML="";                                  //graph html is emptied to remove graph
            document.querySelector(".chart-container").innerHTML="";
            document.querySelector("#last").innerHTML="";
            flag=0;                                                                                                      //flag value changed to 0
        }
        
    });

    var btn=document.querySelector(".submit");

    btn.addEventListener("click", function(){                                                          //on-click function
        document.querySelector("#carouselExampleIndicators").classList.remove("d-none");
        document.querySelector("#carouselExampleIndicators").innerHTML=document.querySelector(".hidden2").innerHTML;    //copying html
        var frames=document.querySelector("#frames");    //initialising variables to store information taken as input
        var str=document.querySelector("#istring");
        var inner=document.querySelector(".carousel-inner");
        var ol=document.querySelector("ol");
        com=frames.value.split(" ");
        var pages=str.value.split(" ");
        var n=pages.length;
        faults=[];
        // creating carousel to show output for different number of frames
        for(k=0;k<com.length;k++){
            var li=document.createElement("li");
            if(k==0)
                li.classList.add("active");          // setting first element of carousel as active
            li.setAttribute("data-target","#carouselExampleIndicators");
            li.setAttribute("data-slide-to",k);
            ol.appendChild(li);                          //appending element
        }
        //time complexity of this for-loop will be O(com.length*n*inst.length) which can be represented as O(N^3)
        for(var k=0;k<com.length;k++){
            var m=parseInt(com[k], 10);             //parsing string input from user as integers
            var item=document.createElement("div");       //creating a div
            item.classList.add("carousel-item");           //adding "carousel-item" class to item element
            if(k==0)
                item.classList.add("active");       // setting first element of carousel as active
            
            inner.appendChild(item);
            var ul=document.createElement("ul");        //creating html element
            ul.innerHTML="<h5>Summary</h5>";        // inserting html in this element       //showing summary of the input
            item.appendChild(ul);                   //appending element to the page
            // displaying the information entered by the user
            var li=document.createElement("li");
            li.textContent="Total frames: "+com[k];
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Algorithm: Optimal";
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Total number of input frames: "+pages.length;
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Sequence of pages: "+str.value;
            ul.appendChild(li);

            var h=document.createElement("h5");
            h.textContent="Visualization";
            item.appendChild(h);

            var hh=document.createElement("h6");
            hh.textContent="For No. of Frames = "+m;
            item.appendChild(hh);
            // creating table to show result
            var tab=document.createElement("table");
            item.appendChild(tab);      //appending element table
            var col=document.createElement("tr");
            tab.appendChild(col);
            var head=document.createElement("td");
            head.innerHTML="<strong style='background: none'>Number</strong>";      // creating row 'Number'.
            head.classList.add("tbl-header");
            col.appendChild(head);
            var head=document.createElement("td");
            head.innerHTML="<strong style='background: none'>Page</strong>";         //creating row 'Page'
            head.classList.add("tbl-header");
            col.appendChild(head);

            for(var i=0;i<com[k];i++){
                var head=document.createElement("td");
                head.innerHTML="<strong style='background: none'>Frame</strong>";        //creating row 'frames' inside (for-loop because number of frames is input from user)
                head.classList.add("tbl-header");       // adding class "tbl-header"
                col.appendChild(head);          // appending frame elements
            }
            var head=document.createElement("td");
            head.innerHTML="<strong style='background: none'>Hit</strong>";          // creating row 'Hit' to show hit status
            head.classList.add("tbl-header");
            col.appendChild(head);
            var head=document.createElement("td");
            head.innerHTML="<strong style='background: none'>Replaced Page</strong>";            // creating row 'Replaced Page' to show replaced pages
            head.classList.add("tbl-header");       // adding "tbl-header" class element to head element
            col.appendChild(head);

            //Code implementation for Optimal Page Replacement Algorithm(OPR)
            var inst=[];                    // 'inst' array is used to keep track of pages inside a frame
            var hits=0;                   // Number of hits
            var fault=0;                     // Number of faults

            for(var i=0;i<n;i++){
                var hit=0, v="-";               // v value is intialised with '-' which will be shown if the frame is empty
                var col=document.createElement("tr");
                tab.appendChild(col);
                var head=document.createElement("td");
                head.textContent=i+1;           // increments frame value to store next page    
                col.appendChild(head);
                var head=document.createElement("td");
                head.textContent=pages[i];
                col.appendChild(head);
                var idx=inst.indexOf(pages[i]);
                /*
                The code finds the index of the first page in the array. If it is not found, then it will find and replace all pages in the frame until there are no more pages 
                to be replaced. 
                */
                if(idx==-1){
                    if(inst.length<m)                    // condition : if the number of inserted pages is less than number of  frames
                        inst.push(pages[i]);                //  inserting pages in frame while the frame has empty slots
                    
                    else{
                        // replacing pages in case where frame is full
                        var temp=inst.slice();                   // splitting inst array and storing in temp variable
                        for(var j=i+1;j<n;j++){
                            var index=temp.indexOf(pages[j]);
                            if(temp.length==1)
                                break;
                            
                            if(index!=-1)
                                temp.splice(index,1);       // splicing temp array
                            
                        }
                        v=temp[0];
                        index=inst.indexOf(temp[0]);            // storing index of temp[0] value present in inst array
                        inst.splice(index,1);                           // difference between splice and slice is that splice returns removed objects while slice returns selected objects
                        inst[m-1]=pages[i];                         // adding new page to 'inst' array
                    }
                    fault++;             // incrementing value of fault
                }
                else{
                    hit=1;
                    hits++;                // incrementing value of number of hits
                }
                for(var j=inst.length-1;j>=0;j--){
                    var head=document.createElement("td");
                    head.textContent=inst[j];                   //adding pages into frames
                    if(j==inst.length-1 && hit==0)
                        head.style.background="#ff1a1a";                    //adding background for fault
                    
                    else if(j==idx)
                        head.style.background="#009900";                        //adding background for hits
                    
                    col.appendChild(head);          // appending element
                }
                for(var j=0;j<m-inst.length;j++){                           // total frames - full frames = number of empty frames. for all these cases, we would enter '-' in frame box
                    var head=document.createElement("td");
                    head.textContent="-";
                    col.appendChild(head);
                }
                var head=document.createElement("td");
                if(hit==1)                         //shows hit status "yes" or "no"
                    head.textContent="Yes";

                else
                    head.textContent="No";
                
                col.appendChild(head);                      //output "yes" or "no" is added to the html
                var head=document.createElement("td");
                head.textContent=v;                         //adding text to replaced pages row
                col.appendChild(head);
            }
            var ul=document.createElement("ul");
            ul.innerHTML="<h5>Observations</h5>";                       //Observation table which shows output
            item.appendChild(ul);
            var li=document.createElement("li");
            li.textContent="Total references: "+n;                          //creating element for showing total references
            ul.appendChild(li);

            var li=document.createElement("li");
            li.textContent="Number of hits: "+hits;             //creating element for showing number of hits
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Number of faults: "+fault;                          //creating element for showing number of faults
            faults.push(fault);
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Hit rate: "+hits+"/"+n+" = "+(hits/n)*100+"%";                      //creating element for showing hit rate 
            ul.appendChild(li);
            var li=document.createElement("li");
            li.textContent="Fault rate: "+fault+"/"+n+" = "+(fault/n)*100+"%";                          //creating element for showing fault rate
            ul.appendChild(li);
        }

        document.querySelector("#btn1").innerHTML="<button><span style='background:#827ffe'>Show Graph</span></button>";                   //updating hide graph to show graph when graph is closed
        document.querySelector("#btn1 button").classList.add("btn1");                               //adding class "btn1" to "#btn1 button"

    });
});