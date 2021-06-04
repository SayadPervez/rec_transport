const rno = ['01', '01C', '02', '03', '03C', '04', '04C', '05', '05C', '06', '07', '07B', '07C', '08', '08C', '09', '09B', '09C', '10', '10C', '11', 
'11C', '12', '12A', '12B', '12C', '13', '13B', '13C', '14', '15', '15A', '15B', '15C', '16', '16B', '16C', '17', '17B', '17c', '18', '18B', '18C', '19', '19a', '19B', '19C', '20', '20B', '20C', '21', '21C', '22', '23', '23C', '24', '24C', '25', '25C', '26', '26C', '27', '27C', '28', '28C', '29', '29C', '30', '30C', '31', '32', '32C', '33', '33C', '34', '35', '35C', '36', '36C', '37', '37B', '37C', '38', '38C', '39', '40', '40B', '40C', '41', '41C', '42', '42C', '43', '44']


fetch("./data.json")
.then(response => {
   return response.json();
})
.then(
    (data) => 
    {
        for(i=0;i<rno.length;i++)
        {
            rowList = data[rno[i]];
            temp = i+1;
            var block=`<tr id="${rno[i]}+"r" style="border:1px solid black;"><td  onclick="expandera(this)" id=${rno[i]+"a"} style="border:1px solid black;">`+
            temp+
            `</td><td  onclick="expanderb(this)"  id=${rno[i]+"b"}  style="border:1px solid black;">`+
            rno[i]+
            `</td><td class="for-margin clb" id="${rno[i]}" onclick="expander(this)" style="border:1px solid black;text-align:left;">`+
            (rowList[0]).location+`<div id="${rno[i]+"x"}" class="clb" style="display:none;">
                <div id="${rno[i]+"qqq"}"></div>
            </div>`+
            `</td>`+
            `</tr>`;
            //console.log((rowList[0]).location);
            document.getElementById("mainTable").innerHTML+=block;
        }
    }
);


function expander(obj)
{
    console.log(obj);
    y=obj.id+"x";
    fetch(`./${obj.id}.html`)
    .then(response => {
        console.log(response);
       return response.text();
    })
    .then(
    (data) => 
    {
        document.getElementById(obj.id+"qqq").innerHTML=data;
    });
    if($(`#${y}`).css('display')=="none")
    {
        $(`#${y}`).css('display',"block");
        document.getElementById(obj.id).style.backgroundColor="#FFF";
        document.getElementById(obj.id+"a").style.backgroundColor="#FFF";
        document.getElementById(obj.id+"b").style.backgroundColor="#FFF";
    }
    else
    {
        $(`#${y}`).css('display',"none");
        document.getElementById(obj.id).style.backgroundColor="#F3E5F5";
        document.getElementById(obj.id+"a").style.backgroundColor="#F3E5F5";
        document.getElementById(obj.id+"b").style.backgroundColor="#F3E5F5";
    }
    for(i=0;i<rno.length;i++)
    {
        if(rno[i]+"x"==y)
            ;
        else
        {
            $(`#${rno[i]+"x"}`).css('display',"none");
            document.getElementById(rno[i]).style.backgroundColor="#F3E5F5";
            document.getElementById(rno[i]+"a").style.backgroundColor="#F3E5F5";
            document.getElementById(rno[i]+"b").style.backgroundColor="#F3E5F5";
        }
    }
}

function expandera(obj)
{
    ret={id:obj.id.slice(0, -1)} ;
    expander(ret);
}

function expanderb(obj)
{
    ret={id:obj.id.slice(0, -1)} ;
    expander(ret);
}