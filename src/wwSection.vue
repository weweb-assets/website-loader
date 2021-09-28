<template>
    <transition name="fade" mode="out-in">
        <div class="website-loader-container" v-show="show" :style="{ backgroundColor: content.backgroundColor }">
            <wwLayout class="website-loader" path="wwObjects" direction="column"> </wwLayout>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        content: Object,
        uid: String,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    data() {
        return {
            closed: false,

            /* wwEditor:start */
            forceDisplay: false,
            /* wwEditor:end */
        };
    },
    computed: {
        show() {
            if (window.__WW_IS_PRERENDER__) return true;

            /* wwEditor:start */
            if (this.isEditing) {
                return this.forceDisplay;
            } else {
                return !this.closed;
            }
            /* wwEditor:end */

            return !this.closed;
        },

        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },

        /* wwEditor:start */
        selectedSection() {
            return this.$store.getters['manager/getSelectedSection'];
        },
        selectedObjects() {
            return this.$store.getters['manager/getSelectedObjects'];
        },
        /* wwEditor:end */
    },
    /* wwEditor:start */
    watch: {
        isEditing() {
            this.forceDisplay = false;
            if (!this.isEditing) {
                this.closed = false;
                this.startLoadingTimeout();
            } else {
                this.closed = true;
            }
        },
        selectedSection: {
            deep: true,
            handler() {
                this.setForceDisplay();
            },
        },
        selectedObjects() {
            this.setForceDisplay();
        },
    },
    /* wwEditor:end */
    methods: {
        startLoadingTimeout() {
            clearTimeout(this.timeout);
            const delay = this.content.duration.slice(0, -1);
            this.timeout = setTimeout(() => {
                if (this.isEditing) return;
                this.closed = true;
            }, delay * 1000);
        },

        /* wwEditor:start */
        setForceDisplay() {
            setTimeout(() => {
                if (this.selectedSection.uid === this.uid) {
                    this.forceDisplay = true;
                } else if (this.$el.querySelector('[data-is-selected]')) {
                    this.forceDisplay = true;
                } else {
                    this.forceDisplay = false;
                }
            }, 100);
        },
        /* wwEditor:end */
    },
    mounted() {
        /* wwFront:start */
        this.startLoadingTimeout();
        /* wwFront:end */
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    },
};
</script>

<style lang="scss" scoped>
.website-loader-container {
    width: 100%;
    height: 100vh;
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .website-loader {
        width: 100%;
        height: 100%;

        /deep/ .ww-layout-item {
            width: 100%;
        }
    }
}

// FADE
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
