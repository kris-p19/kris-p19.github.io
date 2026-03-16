---
layout: default
title: "เพจ"
description: "เพจ"
keywords: "เพจ"
---
<div class="col-md-12" id="content-list"></div>
<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id") || 0;
        if(id){
            try {
                (async function(){
                    await loadData(`${id}`);
                })();
            } catch(e) {
                console.log(e);
            };
        } else {
            window.location.href = `/`;
        }
    });
</script>