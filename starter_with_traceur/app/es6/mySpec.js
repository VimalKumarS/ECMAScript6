describe("how to run a test", function(){

	it("should work...", function() {

		let add = (x,y) => x + y;
		expect(add(5,3)).toBe(8);

	});

	it("will provide block scoping, unlike var",function(){
		var doWork = function(flag){
			if(flag){
				let x=3;
			}
			return x;
		};

		var result = doWork(false);
		expect(result).toBe(3)
	})

	it("will provide block scoping, for",function(){
		var doWork = function(){
			for(let i=0;i<10;i++){

			}
			return i ;
		}

		var result = doWork();
		//expect(result).toBe(10)
		//expect(result).toBeUndefined();
		expect(result).toThrow(new Error("i is not defined"))
	})


	it("Read only variable",function(){
		const Max_Size=10;
		expect(Max_Size).toBe(10);

	})

	it("Read only variable",function(){
		//let x=12; //or
		const x=12;
		var doWork = function(){
			var x=10;
			return x;
		}

		var result  = doWork();
		expect(result).toBe(10);
		expect(x).toBe(12);

	})

	it("destructuring",function(){
		//let x=12; //or
		let x=2;
		let y=3;
		 // let [x,y]=[3,2]
		let [,p,q,r,s]=[1,2,3,4]
		[x,y]=[y,x]

		expect(x).toBe(3);
		expect(y).toBe(2);
		expect(s).toBeUndefined()

	})

	it("work with parameters",function(){
		let doWork=function(url,{data,cache,header}){
			return data;
		}
		let result=doWork("api/test",{data:"test",cahce:false});

		expect(result).toBe("test");
	})

	it("Provide defaults",function(){
		let doWork=function(name="vimal"){
			return name;
		}
		let result=doWork();

		expect(result).toBe("vimal");
	})

	it("Rest Paramters",function(){
		let doWork= function(name,...numbers){
			let result=0;
			numbers.forEach(function(n){
				result+=n;
			})
		}
		let result= doWork("vimal",1,6,3,4);
		expect(result).toBe(14);

	})

	it("can spread an array across parameters",function(){
		let dowork=function(x,y,z){
			return x+y+z;
		}
		var result = dowork(...[1,2,3]);
		expect(result).toBe(6);
	})

	it("string formatter",function(){
		let dowork= function(name){
			reutrn `Hello, $(name)`;
		}
		let result= dowork('vimal');
		expect(result).toBe("Hello, vimal")
	})
});

describe("Class keyword",function(){
	it("can create a class",function(){
		class Employee{
			doWork(){
				return "complete!";
			}

			getName(){
				return "Vimal"
			}
		}

		let e = new Employee();
		expect(e.doWork()).toBe("complete!");
		expect(e.getName()).toBe("vimal");
		expect(Employee.prototype.doWork.call(e)).toBe("complete!");
	})

	it("Constructor",function(){
		class Employee{
			constructor(name){
				this._name=name;
			}
			getName(){
				return this._name;
			}
		}

		let e1 = new Employee("vimal")
		let e2 = new Employee("scott")

		expect(e1.getName()).toBe("vimal")
	})

	it("Getter and Setters",function(){

		class Employee{
			constructor(name){
				//this._name= name;
				this.name=name;
			}

			get name(){
				return this._name
			}
			set name(newValue){
				this._name= newValue
			}
		}

	})

	it("Inheritance",function(){
		class Person{
			constructor(name){
				this.name= name;
			}
			get name(){
				return this._name
			}
			set name(newValue){
				this._name= newValue
			}
			doWork(){

				return "free";
			}
		}

		class Employee extends Person{
			constructor (name,title){
				super(name);
				this._title=title;
			}
			get title(){
				return this._title;
			}
			doWork(){

				return  super() + `${this._name}`;
			}
		}
	})

});

describe("Functional Programmeing",function(){

	it("Arrow Function",function(){
		let add = (x,y) => x+y;
		let square = x => x*x;
		let thres = () => 3;
		let number =[1,2,3,4]
		let sum =0;
		number.forEach(n => sum+=n);
		number.map(n => n*2);
		expect(add(3,5)).toBe(8);
	})

	it("Arrow and async",function(done){

		let self=this;
		self.name= "vimal"

		setTimeout(function(){
			expect(self.name).toBe("vimal")
			done()
		},15)

	})

	it("Iterables and Iterators",function(){
		// collection could be object that computed on fly
		var numbers=[1,2,3,4]
		var sum =0;
		let iterator= numbers.values()
		let next= iterator.next();
		while(!next.done){
			sum += next.value;
			next= iterator.next();
		}
	})


	it("for of",function(){
		let numbers=[1,2,3,4];
		let sum =0
		for (let i of numbers){
			//console.log(i)
			sum +=i;
		}

		expect(sum).toBe(10);
	})


})

describe("iterable",function(){
	it("can be built by implementing symbol.iterator",function(){

		class Comapany {
			constructor(){
				this.employees=[]
			}
			addEmployees(..names){
				this.employees = this.employees.concat(names);
		}
		 [Symbol.iterator](){
			return new ArrayIterator(this.employees);
			}

		}

		class ArrayIterator{
			constructor(array){
				this.array=array;
				this.index=0;
			}

			next(){
				var result={value: undefined,done:true};
				if(this.index<this.array.length){
					result.value=this.array[this.index];
					result.done=false;
					this.index+=1;
				}
				return result;
			}
		}

	    let count=0;
	    let company = new Comapany();
	    company.addEmployees("t","s","j","t");
	    for(let emp of company){
		  count+=1;
	}
	  expect(count).toBe(4);

	 let filter = function*(items,predicate){
	 for(let item of items){
		if(predicate(item)){
		 yield item;
		}
	}
	}

	 for(let emp of filter(company,e=> e[0]=="t")){
	  count +=1;
	}

	let take= function*(items,number){
	 let count =0;
		if(number <1) return;
		for(let item of items){
		 yeild item;
			count +=1;
			if(count>=number){return;}
	}
	}
});

describe("generator",function(){
 it("can build a iterable",function(){
	 let numbers=function*(start,end)
	 {
		 for (let i = start; i<= end; i++) {
			 console.log(i);
			 yield i;
		 }
	 }
	 let sum=0;
	 let iterator = numbers(1,4);
	 console.log("next");
	 let next = iterator.next();
	 while(!next.done){

	 sum+=next.value;
		 next= iterator.next();
	 }

	 for(let n of numbers(1,5)){
		 sum +=n
	 }
   expect(sum).toBe(10)

})

	it("Comprehensions",function(){
	  var numbers =[for (n of [1,2,3]) n*n];
		expect(numbers).toEqual([1,4,9]);
	})

	let filter= function*(items,predicate){
	   yield* [for (item of items) if(predicate(item)) item]; // array generator iterate through all value
		//yield* (for (item of items) if(predicate(item)) item); // comprehension generator

	}

});

describe("Build In Object",function(){
    it("octal literal", function () {
		var a =10;
		var hexd=0xa;
		var octa=071;
		expect(parseInt(octa)).toBe(57);
		var bin = 0b1101;
		expect(bin).toBe(13);
		expect(Number.isFinite("1")).toBe(false)
		expect(Math.pow(2,53)).toBe(Math.pow(2,53)+1);

		expect(Number.MAX_SAFE_INTEGER).toBe(Math.pow(2,53)-1);
		expect(Number.MIN_SAFE_INTEGER).toBe(Math.pow(2,53)*-1+1);
		expect(Number.isSafeInteger(9007199254740991)).toBe(true);


	})

	it("Math",function(){
	  expect(Math.acosh(1)).toBe(0);
		expect(Math.cbrt(27)).toBe(3);

	})

	it("Arrays",function(){
		var match=[1,5,10].find( item => item>8);
		var matchFind= [1,5,10].findIndex(item => item>3);
		[1,2,3,4,5].fill('a')
			[1,2,3,4,5].fill('a',2,3)
		var ary=[1,2,3,4]
		ary.copyWithin(2,0)

		var ary = new Array(3);
		expect(ary.length).toBe(3);
		var ofAry= Array.of(3);
		expect(ofAry.length).toBe(1);

		//entries
		var a =['joe','jim','john'];
		var entries= a.entries();
		var firstEntry= entries.next().value;

		var keys= a.keys();
		var firstKeys= keys.next().value; //0 index
	})

	it("Array Comprehension",function(){
	   var ary=[for (i of [1,2,3]) i]; //[1,2,3]
		expect(ary[2]).toBe(3);
		var ary1=[for (i of [1,2,3]) if (i <3) i]; //[1,2,3]

		var ary4= [for (first of ["William","John","Blake"])
						for(middle of ["Robert","Andrew","John"])
		          if(first != middle) (first + ' ' + middle) ]
	});

	it("Set",function(){
	    var set = new Set();
		expect(set.size).toBe(0);
		set.add("Some Value");
		expect(set.size).toBe(1);
		var key={}
		set.add(key);
		expect(set.has(key)).toBe(true);

		var set1 = new Set();
		set1.add("Tom")
		set1.add("Dick")
		set1.add("Harry")
		var i=0;
		set.forEach(item=> i++);


	})


});


describe("Maps",function(){
   it("map",function(){
     var map = new Map();
	   var ralph={'name':'Ralph'};
	   ageMap.set(ralph,29);
	   except(ageMap.get(ralph)).toBar(29);
   })
})

describe("WeakSets" , function(){
  it("should not have properties and methods",function(){
   var set = new WeakSet();
	  var item ={name:'Joe'};
	  set.add(item);
	  set.delete(item);
	  except(set.has(item)).toBe(false);
  })
})

describe('async generator',function(){
 it('pause function',function(done){
   // Es6 generator yield statement
	 funciton* main(){
	  console.log('start')
		 yield  pause(500)
		 console.log('middle')
		 yield  pause(500)

		 done();

 	}


 })
})

(function(){
	var sequence;
	var run= function(generator){
	 sequence= generator();
		var next = sequence.next()
	}

	var resume = function(value){
	  sequence.next(value)
	}

	var fail= function(reason){
	 sequence.throw(reason)
	}

	window.async={
	 run:run,
		resume:resume,
		fail:fail
	}


}());

describe('object',function(){
  it('is function',function(){
    expect(Object.is(0,-0)).toBe(false)
  })
})