<script>
    import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { auth } from "$lib/firebase";

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        location.href = "/";
    }

    async function loginWithGithub() {
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider);
        location.href = "/";
    }
</script>

<div class="flex w-full h-full justify-center items-center" style="background: url('../rain.svg'); background-size: 100%;">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="flex flex-col py-5 px-10 border-2 rounded-lg hover:shadow-xl transition-all duration-200 border-accent bg-background">
        <h1 class="text-3xl font-bold text-center">Assembler</h1>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div onclick={loginWithGoogle} class="login-google py-2 px-10 rounded-lg border-accent border-2 mx-2 my-4 mb-0 cursor-pointer transition-all hover:shadow-lg hover:bg-accent duration-200 hover:px-12 hover:mx-0">
            Login with Google
        </div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div onclick={loginWithGithub} class="login-github py-2 px-10 rounded-lg border-accent border-2 mx-2 my-4 cursor-pointer transition-all hover:shadow-lg hover:bg-accent duration-200 hover:px-12 hover:mx-0">
            Login with GitHub
        </div>
    </div>
</div>