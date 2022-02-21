export default
    {
        data() {
            return {
                NUM_RESULTS: 8, // Numero de resultados por página
                pag: 1,

            }
        },
        computed: {
            classNext() {
                return this.pag * this.NUM_RESULTS / this.lengthTable() < 1 ? '' : 'disabled'
            },
            classPrevius() {
                return this.pag != 1 ? '' : 'disabled'
            }
        },
        methods:
        {
            lengthTable() {
                return 0
            },
            pagePrevius() {
                if (this.pag > 1)
                    this.pag -= 1
            },
            pageNext() {
                if (this.pag < this.lengthTable())
                    this.pag += 1
            },
            isShow(index) {
                return (this.pag - 1) * this.NUM_RESULTS <= index && this.pag * this.NUM_RESULTS > index
            }

        }
    }