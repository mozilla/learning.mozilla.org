<pre>Activities</pre>
title | CharField  
subtitle | CharField  
description | TextField  
image_url | UrlField  
image_retina_url | UrlField  
url | UrlField  
difficulty | CharField (choices)  
duration | CharField (choices)  
**Skills** | *:*  
**WebLitSkills** | *:*  
**Modules** | *:*  
**locale** | CharField (choices) (pycountry)  
translation_of | ‘self’  



<pre>Skills</pre>
name | CharField  
description | TextField  
**Competencies** | 1:*  
image_url | UrlField  
image_retina_url | UrlField  

<pre>WebLitSkills</pre>
name | CharField  
short_name | CharField  
description | TextField  
**Competencies** | 1:*  
**Skills** | *:*  

<pre>Competencies</pre>
text | TextField  

<pre>Modules</pre>
title | CharField  
description | TextField  
short_description | TextField  
learning_objectives | TextField  
image_url | UrlField  
image_retina_url | UrlField  
level | CharField (choices)  
author | CharField
author_link | CharField
