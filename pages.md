---
layout: default
---
<div class="col-md-12" id="contentmd"></div>
<script type="module">
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || 0;
    if(id){
        loadMarkdown(`${id}`);
    } else {
        window.location.href = `/`;
    }
</script>