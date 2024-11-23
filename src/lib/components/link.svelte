<script>
    let { args, id } = $props();

    let { text = "Click me!", size = 1, href = "https://example.com" } = args;
</script>

<a href={href} class="component link transition-all underline decoration-wavy duration-200 hover:py-2 hover:px-2 my-2 mx-2 hover:m-0 rounded hover:bg-text hover:text-background text-text" style="font-size: {Math.min(Math.max(size, 1), 4)}rem;" id={id}>
    {text}
</a>