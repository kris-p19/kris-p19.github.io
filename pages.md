---
layout: default
title: "เพจ"
description: "เพจ"
keywords: "เพจ"
---
<div class="col-md-12" id="contentmd"></div>
<script>
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || 0;
    if(id){
        try {
            (async function(){
                await loadMarkdown(`${id}`);
            })();
        } catch(e) {
            console.log(e);
        };
    } else {
        window.location.href = `/`;
    }
</script>