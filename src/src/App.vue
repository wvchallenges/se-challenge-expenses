<style scoped>
	.bold{
		font-weight:bold;
	}
</style>
<template>
	<div id="app">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">&nbsp;</div>
			</div>
				<div v-if="isConnected">
					<div class="row">
						<div class="col-xs-12 text-center">
							<label for="cbReplace">Replace existing data</label>
							<input id="cbReplace" type="checkbox" v-model="replace">
						</div>
					</div>
					<div class="row">
						<div class="col-sm-4 col-sm-offset-4">						
							<uploader :url="apiUrl+'upload'" @upload-complete="loadData" placeholder="drop file here"></uploader>
						</div>						
					</div>
					<div class="row">
						<div class="col-xs-12">&nbsp;</div>
					</div>
					<div class="row bold" v-show="entries.length">
						<div class="col-xs-4 col-sm-1 col-sm-offset-4">Year</div>
						<div class="col-xs-4 col-sm-1">Month</div>
						<div class="col-xs-4 col-sm-2 text-right">Total</div>
					</div>
					<div class="row" v-for="row in entries">
						<div class="col-xs-4 col-sm-1 col-sm-offset-4">{{row.year}}</div>
						<div class="col-xs-4 col-sm-1">{{monthNames[row.month-1]}}</div>
						<div class="col-xs-4 col-sm-2 text-right">$ {{row.total.toFixed(2)}}</div>
					</div>
				</div>
				<div v-else>
					<div class="row">
						<div class="col-sm-6 col-sm-offset-3">
							<div class="alert alert-danger" v-show="error">
								<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
								{{error}}
							</div>
							<div class="well">
								<form @submit.prevent = "connectDB">
									<div class="form-group">
										<label for="dbuser">MySQL username</label>
										<input v-model="cred.dbuser" type="text" class="form-control" id="dbuser" placeholder="Username">
									</div>
									<div class="form-group">
										<label for="dbpass">MySQL password</label>
										<input v-model="cred.dbpass" type="password" class="form-control" id="dbpass" placeholder="Password">
									</div>
									<div class="form-group">
										<label for="dbhost">MySQL hostname</label>
										<input v-model="cred.dbhost" type="text" class="form-control" id="dbhost" placeholder="Enter withtout protocol please">
									</div>
									<div class="form-group">
										<label for="dbport">MySQL port</label>
										<input v-model="cred.dbport" type="number" class="form-control" id="dbport">
									</div>
									<div class="form-group">
										<label for="dbname">MySQL DB name</label>
										<input v-model="cred.dbname" type="text" class="form-control" id="dbname">
									</div>
									<button type="submit" class="btn btn-default">Submit</button>
								</form>
								
							</div>
							
							</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'app',
	data : () => ({
		apiUrl : location.protocol + '//' + location.hostname + ':5891/'
		,isConnected : false
		,replace: false
		,monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		,cred:{
			dbuser:''
			,dbpass:''
			,dbhost:'localhost'
			,dbport:3306
			,dbname:'wave_test'
		}
		,entries : []
		,error : ''
	})
	,watch : {
		replace (newValue) {
			this.$http.post(this.apiUrl+'setReplaceData',{replace:newValue});
		}
		,isConnected (newValue) {
			if (newValue) {
				this.loadData();
			}
		}
	}
	,methods : {
		connectDB () {
			this.error = '';
			if (!(this.cred.dbuser && this.cred.dbpass && this.cred.dbhost && this.cred.dbport)){
				this.error = 'Please fill in all the values';
				return;
			}
			this.$http.post(this.apiUrl+'credentials',this.cred)
			.then((data) => {
				this.isConnected = data.body.result;
				if(!this.isConnected){
					this.error = data.body.msg;
				}
			});
		}
		,loadData() {
			this.$http.post(this.apiUrl+'getData')
			.then((data) => {
				this.entries = data.body;
			});
		}
	}
	,mounted () {
		this.$http.post(this.apiUrl+'isConnected')
		.then((data) => {
			this.isConnected = data.body.result;
		},(err) => {
			this.error = "Could not connect to server. Please make sure 'wtest' is running";
		});
	}
}
</script>