/* Forms -> Google Forms (free Google database). Fill URL + entry IDs to go live; until then a mailto fallback is used. */
var CFG={
  newsletter:{url:"",fields:{email:""}},
  suggest:{url:"",fields:{name:"",email:"",store:"",link:"",note:""}}
};
var TO="agents@getservices.ai";
document.addEventListener("submit",function(e){
  var f=e.target,kind=f.getAttribute&&f.getAttribute("data-kind");if(!kind)return;
  e.preventDefault();
  var msg=f.querySelector(".msg"),d=new FormData(f);
  if(d.get("website")){return}
  var c=CFG[kind],vals={};d.forEach(function(v,k){vals[k]=v});
  function ok(){f.reset();msg.textContent=kind==="newsletter"?"Thanks! You're subscribed.":"Thank you! We'll review your suggestion."}
  if(c.url){
    var b=new URLSearchParams();for(var k in c.fields){if(c.fields[k])b.append(c.fields[k],vals[k]||"")}
    fetch(c.url,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:b.toString()})
      .then(ok).catch(function(){msg.textContent="Something went wrong. Please email "+TO+"."});
  }else{
    var s=kind==="newsletter"?"Newsletter signup":"Store suggestion: "+(vals.store||""),
        t=Object.keys(vals).filter(function(k){return k!=="website"}).map(function(k){return k+": "+vals[k]}).join("\n");
    location.href="mailto:"+TO+"?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(t);
    msg.textContent="Opening your email app to send this.";
  }
});
