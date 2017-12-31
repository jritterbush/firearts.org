---
layout: page
title: Upcoming Events
id: events
permalink: /events/
lead: As if you need more excuses to stop by the Fire Arts Center of Chicago. Check back for special events and open houses.
---
<section id="events">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                {{#each events}}
                    {{> event}}
                {{/each}}
            </div>
            <div class="col-md-4">
                <p>If you are looking for class schedules, please visit our <a href="/classes">classes page</a> where you can see the days for each class. The schedule is rolling for many of our classes so please contact us with any other questions about updates.</p>
            </div>
	  </div>
</div>
