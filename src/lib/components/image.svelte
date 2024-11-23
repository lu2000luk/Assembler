<script>
    // @ts-nocheck
    
    let { args, id } = $props();
    let { src = "", resizable = false, width = 640, height = 360, alt = "" } = args;
</script>

<img class="component image input border-2 rounded-lg border-accent focus:border-secondary outline-none bg-background p-2" loading="lazy" id={id} src={src} style="width: {width}px; height: {height}px;" alt={alt} />
