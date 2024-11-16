<script>
    // @ts-nocheck
    import { onMount, onDestroy } from 'svelte';
    import gsap from 'gsap';
    import { browser } from '$app/environment';
    import { draw } from 'svelte/transition';

    let assembler_text = $state();
    let scrolling_texts = $state();
    let button = $state();

    let scrolling_texts_index = $state(0);
    let scrolling_phrases = [
        'demos',
        'APIs',
        'tools',
        'UIs',
        'pages',
        'projects',
        'prototypes',
        'experiments',
    ]

    setInterval(() => {
        if (!browser) return;
        gsap.to(scrolling_texts, { duration: 0.5, filter: 'blur(5px)', onComplete: () => {gsap.to(scrolling_texts, { duration: 0.5, filter: 'blur(0px)' }); scrolling_texts_index = (scrolling_texts_index + 1) % scrolling_phrases.length;} });
    }, 2000);

    let mouseMove = (e) => {
                const x = e.clientX / window.innerWidth - 0.5;
                const y = e.clientY / window.innerHeight - 0.5;
                assembler_text.style.transform = `skew(${x * 80}deg, ${y * 5}deg)`;
        }

    onMount(() => {
        if (!browser) return;
        document.onmousemove = mouseMove;
    });

    onDestroy(() => {
        if (!browser) return;
        document.onmousemove = null;
    });

    function startClick() {
        console.log("Getting started!");
        if (!button || !browser) return;

        let preRect = button.getBoundingClientRect();

        button.style.position = 'absolute';
        button.style.left = preRect.left + 'px';
        button.style.top = preRect.top + 'px';
        button.style.width = preRect.width + 'px';
        button.style.height = preRect.height + 'px';
        button.style.zIndex = 1000;
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';

        document.body.style.cursor = 'none';
        button.style.cursor = 'none';

        let postRect = button.getBoundingClientRect();

        let centerX = window.innerWidth / 2 - postRect.width / 2;
        let centerY = window.innerHeight / 2 - postRect.height / 2;

        // Hide the assembler text
        gsap.to(assembler_text, { duration: 1, opacity: 0 });

        // Move the button to the center of the screen
        gsap.to(button, { duration: 5, left: centerX + 'px', top: centerY + 'px' });

        // Make the button shaky (make it move randomly in every direction with a maximum of 200px from the origin)
        gsap.to(button, { duration: 0.1, delay: 4.8, x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, repeat: -1, yoyo: true });

        // Make the screen flash
        gsap.to('body', { duration: 0.1, backgroundColor: 'white', repeat: 1, delay: 5 });

        // Make the button disappear
        gsap.to(button, { duration: 0.1, delay: 5, opacity: 0, onComplete: () => { button.style.display = 'none'; location.pathname = "/login"; } });
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="homepage w-full h-full overflow-hidden z-30">
    <p class="flex w-full mt-40 flex-col items-center z-40" bind:this={assembler_text}>
        <span class="text-8xl inline-block bg-clip-text bg-gradient-to-r from-primary to-accent transition-all duration-300 scale-125 hover:scale-150" style="color: transparent;">
            Assembler
        </span>
        <span class="text-xl mt-5">
            Your web <span class="scrolling_texts inline-block bg-clip-text bg-gradient-to-r from-primary to-accent font-bold underline decoration-accent decoration-wavy" style="color: transparent;" bind:this={scrolling_texts}>{scrolling_phrases[scrolling_texts_index]}</span> the right way.
        </span>
    </p>

    <div class="flex justify-center">
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <p bind:this={button} class="mt-10 px-5 py-3 bg-secondary text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 hover:bg-accent" onclick={startClick}>Get started</p>
    </div>
</div>