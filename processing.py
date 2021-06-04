from ast import literal_eval as le

with open("./data.json", "r") as f:
    x = le(f.read())

with open("./rno.txt", "r") as f:
    y = f.read()
    y = y.split(",")


for rno in y:
    html = "<hr>"
    z = x[rno]
    for _ in z:
        if(_["spl"] == "yes" or _["heading"] == "yes"):
            color = "red"
        else:
            color = "black"
        if(_["spl"] == "yes"):
            html += f'''<span class="col s12 m8 {color}-text" >{_["location"]}<span><hr>'''
        else:
            html += f'''<span class="col s12 m8 {color}-text" >{_["location"]}<span><br>'''
            html += f'''<span class="new badge purple darken-3 col s12 m4"  data-badge-caption="" style="font-weight:bold;font-size:1rem;">{_["time"]}</span><hr>'''

    with open(f"{rno}.html", "w") as f:
        f.write(html)
