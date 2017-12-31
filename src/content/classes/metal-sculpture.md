---
layout: page
title: Metal Sculpture
id: metal-sculpture 
permalink: /classes/metal-sculpture/
classId: metalSculpture
content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper facilisis ipsum. Pellentesque a mollis purus. In in hendrerit eros. Vestibulum porta urna lectus. In quis odio eu dui pretium pretium. Sed lobortis vestibulum nulla lacinia consequat. Suspendisse eget orci lectus. Integer nisi lacus, dignissim ut ornare et, vehicula quis magna. Integer ac est feugiat, fermentum eros nec, dictum justo. Sed id rutrum purus. Aliquam felis nulla, tincidunt eget tortor et, tristique tempus nisi. Proin congue dui vel nulla venenatis fringilla.,
---

<section id="class-detail">
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                {{#with classes.metalSculpture}}
                    {{> class}}
                {{/with}}
            </div>
            <div class="col-sm-8">
                {{{content}}}
            </div>
        </div>
    </div>
</section>
