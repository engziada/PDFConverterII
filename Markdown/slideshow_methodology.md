I've pdf file @/Curriculum/مذكرة-رياضيات-101-ندى.-1.pdf contains math curriculam in Arabic, the target is to build an interactive slideshow based on it's content covering all it's topics, how will you do that?
each slide should contain the contents of (1~2) pages only, no more... 
slideshow should cover all units, lessons, and pages.
you may add some example as per your understand to the topic
you may add some illustation images or svg to enrich the content ans clarify/support the idea of the slide content
acceptable number of slides should be within (pdf number of pages * 60%) to (total number of pages * 90%)

my idea is not to build the HTML slideshow directly, instead write the contents of the slides into a new md file with a methodology that allow any parser later (may be a Python script) to build and generate HTML slideshow directly from this md.
Parser should be able to identify and distinguish: Units, Lessons, Main content, Examples, Remarks, Notes, Questions and Answers, Tabels, Lists,... and so on...

I want to confirm with you that the first stage (generation of MD from PDF) will be done here by you not locally by running a script.
So the output of this plan should be: md file, html template with the design layout sent, python script to parse the md and generate dynamically contents of the html template.
redesign the plan to ensure these outputs

bare html template layout design should be found @/design.png