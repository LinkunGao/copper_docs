import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.f9076d03.js";const p=JSON.parse('{"title":"Tutorial - FHIR Appointment Resource","description":"","frontmatter":{},"headers":[],"relativePath":"docs/ehr/fhir/hapi_fhir/tutorials/05-appointment-resource.md","filePath":"docs/ehr/fhir/hapi_fhir/tutorials/05-appointment-resource.md","lastUpdated":1698644381000}'),l={name:"docs/ehr/fhir/hapi_fhir/tutorials/05-appointment-resource.md"},o=[e('<h1 id="tutorial-fhir-appointment-resource" tabindex="-1">Tutorial - FHIR Appointment Resource <a class="header-anchor" href="#tutorial-fhir-appointment-resource" aria-label="Permalink to &quot;Tutorial - FHIR Appointment Resource&quot;">​</a></h1><ul><li><p>Tutorial code on GitHub <a href="https://github.com/Copper3D-brids/hapi-py-fhir-tutorials/blob/main/appointment.py" target="_blank" rel="noreferrer">hapi-py-fhir-tutorials -- appointment.py</a>.</p></li><li><p>Currently, it is a <strong>private</strong> repository, will open source later...</p></li></ul><h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><h3 id="scenario" tabindex="-1">Scenario <a class="header-anchor" href="#scenario" aria-label="Permalink to &quot;Scenario&quot;">​</a></h3><p>Make an appointment for the patient (John Thompson) from the <code>Tutorial 02 - patient resource</code> to the parctitioner selected in the <code>Tutorial 04 - parctitioner resource</code> for next Monday (09-16-2018).</p><h2 id="setup-environment" tabindex="-1">Setup environment <a class="header-anchor" href="#setup-environment" aria-label="Permalink to &quot;Setup environment&quot;">​</a></h2><ul><li>Same to Tutorial 02</li></ul><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><h3 id="import-library" tabindex="-1">Import library <a class="header-anchor" href="#import-library" aria-label="Permalink to &quot;Import library&quot;">​</a></h3><p>At the beginning we need to import libraries <code>fhirpy</code> and <code>os</code>.</p><p>Also, we re-use the customise function <code>pprint</code> from Tutorial-02. We&#39;ll use it to display some Observation resource data structures.</p><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>\n<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> fhirpy </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> AsyncFHIRClient</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>\n<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> fhirpy </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> AsyncFHIRClient</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="create-an-instance-of-connection" tabindex="-1">Create an instance of connection <a class="header-anchor" href="#create-an-instance-of-connection" aria-label="Permalink to &quot;Create an instance of connection&quot;">​</a></h3><p>To load data from FHIR server we should instaniate <code>FHIRClient</code> class from <code>fhirpy AsyncFHIRClient</code> method.</p><p>Let&#39;s pass <code>url</code> and <code>authorization</code> arguments from environment.</p><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">client </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> AsyncFHIRClient(</span></span>\n<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;http://localhost:8080/fhir/&#39;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FFAB70;">authorization</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;Bearer TOKEN&#39;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">    )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">client </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> AsyncFHIRClient(</span></span>\n<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;http://localhost:8080/fhir/&#39;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">authorization</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;Bearer TOKEN&#39;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">    )</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Now, we are able to operate with FHIR resources using <code>client</code>.</p><h2 id="find-participants" tabindex="-1">Find participants <a class="header-anchor" href="#find-participants" aria-label="Permalink to &quot;Find participants&quot;">​</a></h2><ul><li>Find a patient whose name is <code>John Thompson</code>.</li></ul><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">patient </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> client.resources(</span><span style="color:#9ECBFF;">&#39;Patient&#39;</span><span style="color:#E1E4E8;">).search(</span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&#39;Jhon&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;Thompson&#39;</span><span style="color:#E1E4E8;">]).first()</span></span>\n<span class="line"><span style="color:#E1E4E8;">pprint(patient)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">patient </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> client.resources(</span><span style="color:#032F62;">&#39;Patient&#39;</span><span style="color:#24292E;">).search(</span><span style="color:#E36209;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&#39;Jhon&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;Thompson&#39;</span><span style="color:#24292E;">]).first()</span></span>\n<span class="line"><span style="color:#24292E;">pprint(patient)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>Find the practitioner we&#39;ve choosen before. Her name is <code>Kelly Smith</code>.</li></ul><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">practitioner </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> client.resources(</span><span style="color:#9ECBFF;">&#39;Practitioner&#39;</span><span style="color:#E1E4E8;">).search(</span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&#39;Kelly&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Smith&#39;</span><span style="color:#E1E4E8;">]).first()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">practitioner </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> client.resources(</span><span style="color:#032F62;">&#39;Practitioner&#39;</span><span style="color:#24292E;">).search(</span><span style="color:#E36209;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&#39;Kelly&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Smith&#39;</span><span style="color:#24292E;">]).first()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="select-date" tabindex="-1">Select date <a class="header-anchor" href="#select-date" aria-label="Permalink to &quot;Select date&quot;">​</a></h2><ul><li>Using <code>Schedule</code> <a href="https://www.hl7.org/fhir/schedule.html#search" target="_blank" rel="noreferrer">search parameters</a> find the scheudle to use with practitioner.</li></ul><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">schedule </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> client.resources(</span><span style="color:#9ECBFF;">&#39;Schedule&#39;</span><span style="color:#E1E4E8;">).search(</span><span style="color:#FFAB70;">actor</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">practitioner.to_reference()).first()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E1E4E8;">pprint(schedule)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">schedule </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> client.resources(</span><span style="color:#032F62;">&#39;Schedule&#39;</span><span style="color:#24292E;">).search(</span><span style="color:#E36209;">actor</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">practitioner.to_reference()).first()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#24292E;">pprint(schedule)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>For the schedule found choose a time slot at 11 am on Monday 16.</li></ul><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">slot </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> client.resources(</span><span style="color:#9ECBFF;">&#39;Slot&#39;</span><span style="color:#E1E4E8;">).search(</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">schedule</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">schedule.to_reference(),</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">start</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;2018-09-16T11:00:00&#39;</span></span>\n<span class="line"><span style="color:#E1E4E8;">).first()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E1E4E8;">details </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (slot.get(</span><span style="color:#9ECBFF;">&#39;start&#39;</span><span style="color:#E1E4E8;">), slot.get(</span><span style="color:#9ECBFF;">&#39;end&#39;</span><span style="color:#E1E4E8;">), slot.get(</span><span style="color:#9ECBFF;">&#39;status&#39;</span><span style="color:#E1E4E8;">))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">slot </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> client.resources(</span><span style="color:#032F62;">&#39;Slot&#39;</span><span style="color:#24292E;">).search(</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">schedule</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">schedule.to_reference(),</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">start</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;2018-09-16T11:00:00&#39;</span></span>\n<span class="line"><span style="color:#24292E;">).first()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#24292E;">details </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (slot.get(</span><span style="color:#032F62;">&#39;start&#39;</span><span style="color:#24292E;">), slot.get(</span><span style="color:#032F62;">&#39;end&#39;</span><span style="color:#24292E;">), slot.get(</span><span style="color:#032F62;">&#39;status&#39;</span><span style="color:#24292E;">))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>Mark selected time slot as <code>busy</code></li></ul><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">slot[</span><span style="color:#9ECBFF;">&#39;status&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;busy&#39;</span></span>\n<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> slot.save()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">slot[</span><span style="color:#032F62;">&#39;status&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;busy&#39;</span></span>\n<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> slot.save()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="appointment-resource" tabindex="-1">Appointment Resource <a class="header-anchor" href="#appointment-resource" aria-label="Permalink to &quot;Appointment Resource&quot;">​</a></h2><p><a href="https://www.hl7.org/fhir/appointment.html" target="_blank" rel="noreferrer">Appointment</a> can be considerd as administrative only, and the <a href="https://www.hl7.org/fhir/encounter.html" target="_blank" rel="noreferrer">Encounter</a> is expected to have clinical implications. In general, it is expected that appointments will result in the creation of an <code>Encounter</code>. The encounter is typically created when the service starts, not when the patient arrives.</p><p>When Request/Reponse pattern is in use, a new <code>Appointment</code> is created with <code>status=proposed</code> or <code>status=pending</code> and the list of actors with status of <code>needs-action</code>. <a href="https://www.hl7.org/fhir/appointmentresponse.html" target="_blank" rel="noreferrer">AppointmentResponse</a> is then used by participants to respond with their acceptance (or not) to the appointment. Once all of the participants have replied, the appointment gets it&#39;s final status.</p><p>In an Emergency Room context, the appointment resource is replaced with <code>Encounter</code>.</p><p>To assign an <code>Appointment</code> to a specific date:</p><ul><li>Determine address details of the resource we want to schedule appointment with.</li><li>Check available <code>Slots</code> for that time.</li><li>Create new <code>Appointment</code> resource with <code>Appointment.status=proposed</code> and <code>status=needs-action</code> for all <code>Appointment.participants</code>.</li><li>Wait for <code>Appointment.status</code> updates for approved or rejected appointments.</li></ul><p>We are already agreed on the time slot. All of the addressing information is provided by the <code>Schedule</code> the time slot is booked for.</p><p>Let&#39;s create a new <code>Appointment</code>.</p><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># All of the actors from Schedule</span></span>\n<span class="line"><span style="color:#E1E4E8;">participants </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [{</span><span style="color:#9ECBFF;">&#39;actor&#39;</span><span style="color:#E1E4E8;">:actor, </span><span style="color:#9ECBFF;">&#39;status&#39;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&#39;needs-action&#39;</span><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> actor </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> schedule[</span><span style="color:#9ECBFF;">&#39;actor&#39;</span><span style="color:#E1E4E8;">]]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;"># Plus the patient</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E1E4E8;">participants </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> [{</span><span style="color:#9ECBFF;">&#39;actor&#39;</span><span style="color:#E1E4E8;">:patient.to_reference(), </span><span style="color:#9ECBFF;">&#39;status&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;accepted&#39;</span><span style="color:#E1E4E8;">}]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;"># Create an Appointment</span></span>\n<span class="line"><span style="color:#E1E4E8;">appointment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.resource(</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;Appointment&#39;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">status</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;proposed&#39;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">start</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">slot[</span><span style="color:#9ECBFF;">&#39;start&#39;</span><span style="color:#E1E4E8;">],</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">end</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">slot[</span><span style="color:#9ECBFF;">&#39;end&#39;</span><span style="color:#E1E4E8;">],</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">slot</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">[slot],</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">participant</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">participants</span></span>\n<span class="line"><span style="color:#E1E4E8;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> appointment.save()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E1E4E8;">pprint(appointment)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># All of the actors from Schedule</span></span>\n<span class="line"><span style="color:#24292E;">participants </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [{</span><span style="color:#032F62;">&#39;actor&#39;</span><span style="color:#24292E;">:actor, </span><span style="color:#032F62;">&#39;status&#39;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&#39;needs-action&#39;</span><span style="color:#24292E;">} </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> actor </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> schedule[</span><span style="color:#032F62;">&#39;actor&#39;</span><span style="color:#24292E;">]]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;"># Plus the patient</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#24292E;">participants </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> [{</span><span style="color:#032F62;">&#39;actor&#39;</span><span style="color:#24292E;">:patient.to_reference(), </span><span style="color:#032F62;">&#39;status&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;accepted&#39;</span><span style="color:#24292E;">}]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;"># Create an Appointment</span></span>\n<span class="line"><span style="color:#24292E;">appointment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.resource(</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;Appointment&#39;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">status</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;proposed&#39;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">start</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">slot[</span><span style="color:#032F62;">&#39;start&#39;</span><span style="color:#24292E;">],</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">end</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">slot[</span><span style="color:#032F62;">&#39;end&#39;</span><span style="color:#24292E;">],</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">slot</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[slot],</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">participant</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">participants</span></span>\n<span class="line"><span style="color:#24292E;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> appointment.save()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#24292E;">pprint(appointment)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="find-appointments" tabindex="-1">Find appointments <a class="header-anchor" href="#find-appointments" aria-label="Permalink to &quot;Find appointments&quot;">​</a></h2><ul><li>Using <code>Appointment</code> <a href="https://www.hl7.org/fhir/appointment.html#search" target="_blank" rel="noreferrer">search parameters</a> get a list of appointments for the paitent.</li></ul><div class="language-py vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">appointments </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> client.resources(</span><span style="color:#9ECBFF;">&#39;Appointment&#39;</span><span style="color:#E1E4E8;">).search(</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">patient</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">patient[</span><span style="color:#9ECBFF;">&#39;id&#39;</span><span style="color:#E1E4E8;">]</span></span>\n<span class="line"><span style="color:#E1E4E8;">).fetch()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E1E4E8;">details </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [(ap.get(</span><span style="color:#9ECBFF;">&#39;id&#39;</span><span style="color:#E1E4E8;">),ap.get(</span><span style="color:#9ECBFF;">&#39;start&#39;</span><span style="color:#E1E4E8;">), ap.get(</span><span style="color:#9ECBFF;">&#39;end&#39;</span><span style="color:#E1E4E8;">), ap.get(</span><span style="color:#9ECBFF;">&#39;status&#39;</span><span style="color:#E1E4E8;">)) </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> ap </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> appointments]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(details)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">appointments </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> client.resources(</span><span style="color:#032F62;">&#39;Appointment&#39;</span><span style="color:#24292E;">).search(</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">patient</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">patient[</span><span style="color:#032F62;">&#39;id&#39;</span><span style="color:#24292E;">]</span></span>\n<span class="line"><span style="color:#24292E;">).fetch()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#24292E;">details </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [(ap.get(</span><span style="color:#032F62;">&#39;id&#39;</span><span style="color:#24292E;">),ap.get(</span><span style="color:#032F62;">&#39;start&#39;</span><span style="color:#24292E;">), ap.get(</span><span style="color:#032F62;">&#39;end&#39;</span><span style="color:#24292E;">), ap.get(</span><span style="color:#032F62;">&#39;status&#39;</span><span style="color:#24292E;">)) </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> ap </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> appointments]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(details)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-label="Permalink to &quot;Summary&quot;">​</a></h2><p>In this tutorial we&#39;ve discussed:</p><ul><li>How to book a time slot</li><li>How to create an <code>Appointment</code></li><li>How to search for <code>Appointments</code></li></ul>',44)];const t=s(l,[["render",function(s,e,p,l,t,r){return a(),n("div",null,o)}]]);export{p as __pageData,t as default};
