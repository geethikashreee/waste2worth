const W2W_KEY='w2wState';
function getState(){try{return JSON.parse(localStorage.getItem(W2W_KEY)||'{}')}catch(e){return {}}}
function saveState(patch){const s=Object.assign({},getState(),patch);localStorage.setItem(W2W_KEY,JSON.stringify(s));return s}
document.addEventListener('DOMContentLoaded',function(){
var requestBtn=document.getElementById('requestMaterial');
if(requestBtn)requestBtn.onclick=function(){saveState({requestStage:'Exchange Request',material:'1200 kg PEEK fabric scrap cut pieces'});var n=document.getElementById('listingNotice');if(n)n.textContent='Exchange request created. Open Buyer workspace to continue negotiation and pathway review.'};
var ask=document.getElementById('askSeller');
if(ask)ask.onclick=function(){saveState({requestStage:'Negotiation'});var n=document.getElementById('listingNotice');if(n)n.textContent='Seller inquiry saved for the demo negotiation stage.'};
var req=document.getElementById('saveRequirement');
if(req)req.onclick=function(){saveState({requirement:{material:document.getElementById('reqMaterial').value,quantity:document.getElementById('reqQuantity').value,location:document.getElementById('reqLocation').value,spec:document.getElementById('reqSpec').value}});document.getElementById('reqNotice').textContent='Requirement saved. Matching signals updated.'};
var adv=document.getElementById('advanceBuyer');
if(adv)adv.onclick=function(){var stages=['Exchange Request','Negotiation','Verification','Agreement','Transaction','Impact Record'];var s=getState(),i=Math.max(0,stages.indexOf(s.requestStage||'Exchange Request'));i=Math.min(i+1,stages.length-1);saveState({requestStage:stages[i]});renderBuyer()};
function renderBuyer(){var s=getState(),st=document.getElementById('buyerStage'),mat=document.getElementById('buyerMaterial'),reqEl=document.getElementById('buyerRequirement');if(st)st.textContent=s.requestStage||'No request yet';if(mat)mat.textContent=s.material||'No material selected';if(reqEl)reqEl.textContent=s.requirement?s.requirement.material+' · '+s.requirement.quantity+' · '+s.requirement.location:'No requirement saved'}
renderBuyer();
});