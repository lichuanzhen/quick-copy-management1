<script>
export default {
    name: 'BackComponent',
    data() {
        return {
            backRoute: ''
        };
    },
    mounted() {
        if (!this.$route.params.backFlag) {
            this.backRoute = this.$route.params.backRoute;
        }
    },
    activated() {
        if (!this.$route.params.backFlag) {
            this.backRoute = this.$route.params.backRoute;
        }
    },
    methods: {
        back() {
            if (this.backRoute) {
                this.$router.push({ name: this.backRoute, params: { backFlag: true } });
            } else {
                this.$router.push({ path: this.$route.matched[this.$route.matched.length - 2].path, params: { backFlag: true } });
            }
        }
    }
};
</script>