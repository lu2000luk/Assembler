<script>
    let { args, id } = $props();
    let { text = "Text here..." } = args;
</script>

<button class="component button rounded-lg border-2 border-accent duration-200 transition-all hover:bg-accent cursor-pointer py-2 px-4 backdrop-blur" id={id}>
    {text}
</button>