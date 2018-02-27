class FullPage {
    constructor(el) {
        this.$el = document.querySelector(el)
        this.duration = 1
        this.items = Array.from(this.$el.children)
        this.isTran = false
        this.addObserve(this,'index',1)
        this.addTran()
        this.addWheelHandle()
    }
    addObserve(obj,key,val){
        const property = Object.getOwnPropertyDescriptor(obj, key)
        const getter = property && property.get
        const setter = property && property.set

        Object.defineProperty(obj,key,{
            get:function(){
                const value = getter ? getter.call(obj) : val

                return value
            },
            set:function(newVal){
                const value = getter ? getter.call(obj) : val

                if (setter) {
                    setter.call(obj, newVal)
                } else {
                    val = newVal
                }
                
                this.render()
            }
        })
    }
    addWheelHandle(){
        const self = this
        this.$el.addEventListener('wheel',e=>{
            // if(self.index > self.items.length) return
            // e.deltaY > 0 ? ++self.index : --self.index
            if(self.isTran){
                return
            }else {
                self.isTran = true
            }
            let targetIndex = e.deltaY > 0 ? 1 : -1
            targetIndex = targetIndex + self.index 
            if(targetIndex < 1){
                self.isTran = false
                targetIndex = 1
            }else if(targetIndex > self.items.length){
                self.isTran = false
                targetIndex = self.index
            }
            self.index = targetIndex
        },false)
        this.items[0].addEventListener('transitionend',e=>{
            self.isTran = false
        })
    }
    addTran(){
        this.items.forEach(item=>item.style.transition = `${this.duration}s`)
    }
    render(){
        let index = -(this.index-1)
        this.items.forEach(item=>item.style.transform=`translateY(${index*100}%)`)
    }
}