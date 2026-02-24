const jobs = [
  {id:1, company:"Mobile First Corp", position:"React Native Developer", location:"Remote", type:"Full-time", salary:"$130,000 - $175,000", description:"Build cross-platform mobile applications using React Native for millions of users.", status:"all"},
  {id:2, company:"WebFlow Agency", position:"Web Designer & Developer", location:"Los Angeles, CA", type:"Part-time", salary:"$80,000 - $120,000", description:"Create modern and responsive websites for high-profile clients.", status:"all"},
  {id:3, company:"DataViz Solutions", position:"Data Visualization Specialist", location:"Boston, MA", type:"Full-time", salary:"$125,000 - $165,000", description:"Transform complex datasets into meaningful visual insights.", status:"all"},
  {id:4, company:"CloudFirst Inc", position:"Backend Developer", location:"Seattle, WA", type:"Full-time", salary:"$140,000 - $190,000", description:"Build scalable backend systems using Python and AWS.", status:"all"},
  {id:5, company:"Innovation Labs", position:"UI/UX Engineer", location:"Austin, TX", type:"Full-time", salary:"$110,000 - $150,000", description:"Design clean and usable interfaces with strong frontend skills.", status:"all"},
  {id:6, company:"MegaCorp Solutions", position:"JavaScript Developer", location:"New York, NY", type:"Full-time", salary:"$130,000 - $170,000", description:"Develop enterprise applications using modern JavaScript frameworks.", status:"all"},
  {id:7, company:"StartupXYZ", position:"Full Stack Engineer", location:"Remote", type:"Full-time", salary:"$120,000 - $160,000", description:"Work on core platform features using Node.js and React.", status:"all"},
  {id:8, company:"TechCorp Industries", position:"Senior Frontend Developer", location:"San Francisco, CA", type:"Full-time", salary:"$130,000 - $175,000", description:"Build scalable frontend applications using React and TypeScript.", status:"all"}
];

let activeTab = "all";

function render() {
  const list = document.getElementById("jobList");
  const empty = document.getElementById("emptyState");
  list.innerHTML = "";

  const filtered = activeTab === "all" ? jobs : jobs.filter(j=>j.status===activeTab);

  if(filtered.length===0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
  }

  filtered.forEach(job => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h3 class="font-bold">${job.company}</h3>
          <p class="text-gray-700">${job.position}</p>
          <p class="text-sm text-gray-500">${job.location} • ${job.type} • ${job.salary}</p>
          <p class="mt-2 text-sm">${job.description}</p>
        </div>
        <button class="text-red-500" onclick="deleteJob(${job.id})"><i class="delete-icon">trash</i></button>
      </div>
      <div class="flex gap-3 mt-4">
        <button onclick="setStatus(${job.id}, 'interview')" class="px-3 py-1 rounded border ${job.status==='interview'?'bg-green-500 text-white':''}">Interview</button>
        <button onclick="setStatus(${job.id}, 'rejected')" class="px-3 py-1 rounded border ${job.status==='rejected'?'bg-red-500 text-white':''}">Rejected</button>
      </div>
           `;
    list.appendChild(card);
  });

  updateCounts();
}

function setStatus(id,status){
  const job = jobs.find(j=>j.id===id);
  job.status = job.status===status?"all":status;
  render();
}

function deleteJob(id){
  const index = jobs.findIndex(j=>j.id===id);
  jobs.splice(index,1);
  render();
}

function updateCounts(){
  document.getElementById("totalCount").textContent = jobs.length;
  document.getElementById("interviewCount").textContent = jobs.filter(j=>j.status==='interview').length;
  document.getElementById("rejectedCount").textContent = jobs.filter(j=>j.status==='rejected').length;
  document.getElementById("allJobsCount").textContent = `${jobs.length} jobs`;
}

document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("border-b-2","border-black"));
    btn.classList.add("border-b-2","border-black");
    activeTab=btn.dataset.tab;
    render();
  };
});

render();