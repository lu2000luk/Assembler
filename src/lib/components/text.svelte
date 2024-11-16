<script>
    let { args } = $props();

    let { text = "Hello world!", size = 1 } = args;
</script>

<div class="component text" style="font-size: {Math.min(Math.max(size, 1), 4)}rem;">
    {text}
</div>