/*

Pass in group and receive an array of targetNames associated with each person who's currently on-call

Temporary replacements are respected and will take precedence over the regualarly-scheduled member

One way to use this is to confirm that a member being targeted is on-call right now using:

    if(oncall_right_now("group name").contains("bsmith")){ 
        ... 
    }

*/

function oncall_right_now(grp){

    var ONCALLrequest = http.request({ 
        "endpoint": "xMatters",
        "path": "/api/xm/1/on-call?groups=" + grp + "&embed=shift,members.owner&membersPerShift=100",
        "method": "GET"
    });

    var ONCALLresponse = ONCALLrequest.write();
    ONCALLjson = JSON.parse(ONCALLresponse.body);

    oncall = [];

    for (var e in ONCALLjson.data["members"].data) {                                                        
        if (typeof ONCALLjson.data["members"].data[e].replacements.data[0].replacement.targetName !== "undefined") {
            oncall.push(ONCALLjson.data["members"].data[e].replacements.data[0].replacement.targetName);
            } else {
            oncall.push(ONCALLjson.data["members"].data[e].targetName);
            }
    }

    return oncall;
}