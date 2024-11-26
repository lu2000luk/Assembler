<script>
    // @ts-nocheck
    
    let { args, id } = $props();
    let { src = "", resizable = false, width = 640, height = 360 } = args;
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video class="component video input border-2 rounded-lg border-accent focus:border-secondary outline-none bg-background p-2" id={id} width={width} height={height} controls>
    <source src={src} type="video/mp4">
    Your browser does not support the video tag.
</video>
