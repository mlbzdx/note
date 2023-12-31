> 1.flex与inline-flex的区别：

使用了display: flex 属性后，父元素不设置宽度，宽度就是100%；不会被子元素宽度撑开；
使用了display: inline-flex 属性后，父元素不设置宽度，宽度就是所有的子元素宽度之和，会被子元素宽度撑开，实现宽度自适应；

```html
	<div class="container">
		<!-- 变成弹性盒模型 -->
		<div class="row">
			<div class="col bg-primary text-white py-2 d-flex">这是一个弹性盒子</div>
			<div class="col bg-info text-white py-2 d-inline-flex">这是一个弹性盒子</div>
		</div>
		<!-- 变成响应式的弹性盒模型 d-{breakpoint}-flex/inline-flex -->
		<div class="row mt-1">
			<div class="col bg-primary text-white py-2 d-lg-flex">这是一个弹性盒子</div>
			<div class="col bg-info text-white py-2 d-lg-inline-flex">这是一个弹性盒子</div>
		</div>


		<!-- 
			子元素的排列方向
				1、flex-row				正序水平排列
				2、flex-row-reverse		倒序水平排列
				3、flex-column			正序垂直排列
				4、flex-column-reverse	倒序垂直排列
		 -->
		<div class="row bg-dark mt-5 flex-row">	<!-- 正序水平排列 -->
			<div class="bg-success text-white">第1列</div>
			<div class="bg-success text-white">第2列</div>
			<div class="bg-success text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 flex-row-reverse">	<!-- 倒序水平排列 -->
			<div class="bg-success text-white">第1列</div>
			<div class="bg-success text-white">第2列</div>
			<div class="bg-success text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 flex-column">	<!-- 正序垂直排列 -->
			<div class="bg-success text-white">第1列</div>
			<div class="bg-success text-white">第2列</div>
			<div class="bg-success text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 flex-column-reverse">	<!-- 倒序垂直排列 -->
			<div class="bg-success text-white">第1列</div>
			<div class="bg-success text-white">第2列</div>
			<div class="bg-success text-white">第3列</div>
		</div>

		<!-- 响应式的排列方式，flex-{breakpoint}-row/column/row-reverse/column-reverse -->
		<div class="row bg-dark mt-1 flex-sm-column-reverse">	<!-- 倒序垂直排列 -->
			<div class="bg-success text-white">第1列</div>
			<div class="bg-success text-white">第2列</div>
			<div class="bg-success text-white">第3列</div>
		</div>


		<!-- 
			子元素的对齐方式
				1、主轴上的对齐 - 水平对齐
				2、交叉轴（纵轴）上的对齐 - 垂直对齐
		 -->
		<div class="row bg-dark mt-5 justify-content-start"><!-- 主轴上的对齐-左对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 justify-content-end"><!-- 主轴上的对齐-右对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 justify-content-center"><!-- 主轴上的对齐-居中对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 justify-content-between"><!-- 主轴上的对齐-两端对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 justify-content-around"><!-- 主轴上的对齐-分散居中对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 justify-content-lg-around"><!-- 主轴上的对齐-分散居中对齐-响应式，justify-content-{breakpoint}-between/... -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>

		<div class="row bg-dark mt-1 align-items-start" style="height: 100px;"><!-- 交叉轴上的对齐-顶对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 align-items-end" style="height: 100px;"><!-- 交叉轴上的对齐-底对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 align-items-center" style="height: 100px;"><!-- 交叉轴上的对齐-中间对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 align-items-baseline" style="height: 100px;"><!-- 交叉轴上的对齐-基线对齐 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 align-items-stretch" style="height: 100px;"><!-- 交叉轴上的对齐-如果子元素没有设置高或者设置成了auto，子元素将占满整个容器的高度 -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white" style="height: 50px;">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>
		<div class="row bg-dark mt-1 align-items-md-start" style="height: 100px;"><!-- 交叉轴上的对齐-响应式 align-items-{breakpoint}-start/... -->
			<div class="bg-danger text-white">第1列</div>
			<div class="bg-danger text-white" style="height: 50px;">第2列</div>
			<div class="bg-danger text-white">第3列</div>
		</div>


		<!-- 
			元素的自身的对齐方式
		 -->
		<div class="row bg-secondary mt-5" style="height: 100px;">
			<div class="bg-warning text-white align-self-start">第1列</div>
			<div class="bg-warning text-white align-self-end">第2列</div>
			<div class="bg-warning text-white align-self-center">第3列</div>
			<div class="bg-warning text-white align-self-baseline">第4列</div>
			<div class="bg-warning text-white align-self-stretch">第5列</div>
		</div>
		<!-- 元素的自身的对齐方式-响应式，align-self-{breakpoint}-start -->
		<div class="row bg-secondary mt-1" style="height: 100px;">
			<div class="bg-warning text-white align-self-xl-start">第1列</div>
			<div class="bg-warning text-white align-self-xl-end">第2列</div>
			<div class="bg-warning text-white align-self-xl-center">第3列</div>
			<div class="bg-warning text-white align-self-xl-baseline">第4列</div>
			<div class="bg-warning text-white align-self-xl-stretch">第5列</div>
		</div>


		<!-- 填满 -->
		<div class="row mt-5 bg-primary">
			<div class="bg-info text-white border-right flex-fill">第1列</div>
			<div class="bg-info text-white border-right flex-fill">第2列</div>
			<div class="bg-info text-white border-right flex-fill">第3列</div>
		</div>
		<!-- 填满，响应式，flex-{breakpoint}-fill -->
		<div class="row mt-1 bg-primary">
			<div class="bg-info text-white border-right flex-md-fill">第1列</div>
			<div class="bg-info text-white border-right flex-md-fill">第2列</div>
			<div class="bg-info text-white border-right flex-md-fill">第3列</div>
		</div>


		<!-- 
			伸缩值
				1、.flex-grow-*		扩展比例，数字为0表示不扩展，数字为1表示扩展。只有这两个数字
				2、.flex-shrink-*	收缩比例，数字为0表示不收缩，数字为1表示收缩。只有这两个数字
		 -->
		<div class="row mt-5 bg-primary">
			<div class="bg-danger border-right text-white flex-grow-1">第1列</div>
			<div class="bg-danger border-right text-white">第2列</div>
			<div class="bg-danger border-right text-white">第3列</div>
		</div>
		<div class="mt-1 bg-primary d-flex">
			<div class="bg-danger border-right text-white w-100">第1列</div>
			<div class="bg-danger border-right text-white flex-shrink-1">第2列</div>
		</div>
		<!-- 伸缩响应式，flex-{breakpoint}-{grow|shrink}-0/1 -->
		<div class="row bg-primary">
			<div class="bg-danger border-right text-white flex-lg-grow-1">第1列</div>
			<div class="bg-danger border-right text-white">第2列</div>
			<div class="bg-danger border-right text-white">第3列</div>
		</div>


		<!-- 自动的间距 -->
		<div class="row mt-5 bg-secondary">
			<div class="bg-success text-white py-2 mr-auto">第1列</div>
			<div class="bg-success text-white py-2">第2列</div>
			<div class="bg-success text-white py-2">第3列</div>
		</div>
		<div class="row mt-1 bg-secondary">
			<div class="bg-success text-white py-2">第1列</div>
			<div class="bg-success text-white py-2">第2列</div>
			<div class="bg-success text-white py-2 ml-auto">第3列</div>
		</div>
		
		<div class="row mt-1 bg-secondary flex-column" style="height: 220px;">
			<div class="bg-success text-white py-2 col-2 mb-auto">第1列</div>
			<div class="bg-success text-white py-2 col-2">第2列</div>
			<div class="bg-success text-white py-2 col-2">第3列</div>
		</div>
		<div class="row mt-1 bg-secondary flex-column align-items-end" style="height: 220px;">
			<div class="bg-success text-white py-2 col-2">第1列</div>
			<div class="bg-success text-white py-2 col-2">第2列</div>
			<div class="bg-success text-white py-2 col-2 mt-auto">第3列</div>
		</div>


		<!-- Wrap 换行-->
		<div class="row mt-5 bg-secondary flex-wrap-reverse">
			<div class="col-1 bg-primary text-white">第1列</div>
			<div class="col-1 bg-primary text-white">第2列</div>
			<div class="col-1 bg-primary text-white">第3列</div>
			<div class="col-1 bg-primary text -white">第4列</div>
			<div class="col-1 bg-primary text-white">第5列</div>
			<div class="col-1 bg-primary text-white">第6列</div>
			<div class="col-1 bg-primary text-white">第7列</div>
			<div class="col-1 bg-primary text-white">第8列</div>
			<div class="col-1 bg-primary text-white">第9列</div>
			<div class="col-1 bg-primary text-white">第10列</div>
			<div class="col-1 bg-primary text-white">第11列</div>
			<div class="col-1 bg-primary text-white">第12列</div>
			<div class="col-1 bg-primary text-white">第13列</div>
			<div class="col-1 bg-primary text-white">第14列</div>
			<div class="col-1 bg-primary text-white">第15列</div>
			<div class="col-1 bg-primary text-white">第16列</div>
			<div class="col-1 bg-primary text-white">第17列</div>
			<div class="col-1 bg-primary text-white">第18列</div>
		</div>
		<!-- Wrap,响应式，flex-{breakpoint}-wrap -->
		<div class="row mt-1 bg-secondary flex-xl-wrap-reverse">
			<div class="col-1 bg-primary text-white">第1列</div>
			<div class="col-1 bg-primary text-white">第2列</div>
			<div class="col-1 bg-primary text-white">第3列</div>
			<div class="col-1 bg-primary text-white">第4列</div>
			<div class="col-1 bg-primary text-white">第5列</div>
			<div class="col-1 bg-primary text-white">第6列</div>
			<div class="col-1 bg-primary text-white">第7列</div>
			<div class="col-1 bg-primary text-white">第8列</div>
			<div class="col-1 bg-primary text-white">第9列</div>
			<div class="col-1 bg-primary text-white">第10列</div>
			<div class="col-1 bg-primary text-white">第11列</div>
			<div class="col-1 bg-primary text-white">第12列</div>
			<div class="col-1 bg-primary text-white">第13列</div>
			<div class="col-1 bg-primary text-white">第14列</div>
			<div class="col-1 bg-primary text-white">第15列</div>
			<div class="col-1 bg-primary text-white">第16列</div>
			<div class="col-1 bg-primary text-white">第17列</div>
			<div class="col-1 bg-primary text-white">第18列</div>
		</div>


		<!-- 排序 -->
		<div class="row bg-secondary mt-5">
			<div class="col-1 bg-info text-white order-2">第1列</div>
			<div class="col-1 bg-info text-white order-6">第2列</div>
			<div class="col-1 bg-info text-white order-3">第3列</div>
			<div class="col-1 bg-info text-white order-4">第4列</div>
			<div class="col-1 bg-info text-white order-1">第5列</div>
			<div class="col-1 bg-info text-white order-0">第6列</div>
			<div class="col-1 bg-info text-white order-5">第7列</div>
		</div>
		<!-- 排序,响应式,order-{breakpoint}-10/... -->
		<div class="row bg-secondary mt-1">
			<div class="col-1 bg-info text-white order-sm-2">第1列</div>
			<div class="col-1 bg-info text-white order-sm-6">第2列</div>
			<div class="col-1 bg-info text-white order-sm-3">第3列</div>
			<div class="col-1 bg-info text-white order-sm-4">第4列</div>
			<div class="col-1 bg-info text-white order-sm-1">第5列</div>
			<div class="col-1 bg-info text-white order-sm-0">第6列</div>
			<div class="col-1 bg-info text-white order-sm-5">第7列</div>
		</div>


		<!-- 
			多行对齐，对于单行是没有效果的
				align-content-start		顶对齐
				align-content-end		底对齐
				align-content-center	中间对齐
				align-content-between	上下两端对齐
				align-content-around	上下分散对齐
				align-content-stretch	没有给高度或者高度为auto，那高度会取父级的高度
		 -->
		<div class="row bg-secondary mt-5 align-content-stretch " style="height: 200px;">
			<div class="col-1 bg-primary text-white">第1列</div>
			<div class="col-1 bg-primary text-white">第2列</div>
			<div class="col-1 bg-primary text-white">第3列</div>
			<div class="col-1 bg-primary text-white">第4列</div>
			<div class="col-1 bg-primary text-white">第5列</div>
			<div class="col-1 bg-primary text-white">第6列</div>
			<div class="col-1 bg-primary text-white">第7列</div>
			<div class="col-1 bg-primary text-white">第8列</div>
			<div class="col-1 bg-primary text-white">第9列</div>
			<div class="col-1 bg-primary text-white">第10列</div>
			<div class="col-1 bg-primary text-white">第11列</div>
			<div class="col-1 bg-primary text-white">第12列</div>
			<div class="col-1 bg-primary text-white">第13列</div>
			<div class="col-1 bg-primary text-white">第14列</div>
			<div class="col-1 bg-primary text-white">第15列</div>
			<div class="col-1 bg-primary text-white">第16列</div>
			<div class="col-1 bg-primary text-white">第17列</div>
			<div class="col-1 bg-primary text-white">第18列</div>
		</div>

		<!-- 多行对齐响应式, align-content-{breakpoint}-end-->
		<div class="row bg-secondary mt-5 align-content-md-around" style="height: 200px;">
			<div class="col-1 bg-primary text-white">第1列</div>
			<div class="col-1 bg-primary text-white">第2列</div>
			<div class="col-1 bg-primary text-white">第3列</div>
			<div class="col-1 bg-primary text-white">第4列</div>
			<div class="col-1 bg-primary text-white">第5列</div>
			<div class="col-1 bg-primary text-white">第6列</div>
			<div class="col-1 bg-primary text-white">第7列</div>
			<div class="col-1 bg-primary text-white">第8列</div>
			<div class="col-1 bg-primary text-white">第9列</div>
			<div class="col-1 bg-primary text-white">第10列</div>
			<div class="col-1 bg-primary text-white">第11列</div>
			<div class="col-1 bg-primary text-white">第12列</div>
			<div class="col-1 bg-primary text-white">第13列</div>
			<div class="col-1 bg-primary text-white">第14列</div>
			<div class="col-1 bg-primary text-white">第15列</div>
			<div class="col-1 bg-primary text-white">第16列</div>
			<div class="col-1 bg-primary text-white">第17列</div>
			<div class="col-1 bg-primary text-white">第18列</div>
		</div>
</div>
```



