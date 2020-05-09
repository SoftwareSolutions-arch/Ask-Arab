import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profileForm: FormGroup;
  error_messages = {
    name: [{ type: "required", message: "*Name is required." }],
    lastname: [
      { type: "required", message: "*Lastname is required." },
    ],
    address: [
      { type: "required", message: "*Address is required." },
    ],
    mobilenumber: [
      { type: "required", message: "*Mobile number is required." },
      { type: "minlength", message: "*Minimum length should be 10." },
      { type: "maxlength", message: "*Maximum length should be 12 ." }
    ],
    datebirth: [
      { type: "required", message: "*Date of birth is required." },
    ]
  };
  userData:any={};
  userImage: any = 'assets/img/profile-default.jpeg';
  private countryList: any = [];

  constructor(public user: User, public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController,public util:UtilProvider,
              public storage : Storage,
              public navParams: NavParams, public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
    this.setProfileFormData();
    this.storage.get('userData').then(data=>{
      this.userData = JSON.parse(data);
      console.log('this.userData ----',this.userData);
      this.populateData();
    })
  }

  ngOnInit(){
    this.getCountryList()
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.user.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.user.aceesGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
  }


  openMyProfile(isOtherUser: boolean) {
    this.navCtrl.push('MyProfilePage',{isOtherUserProfile : isOtherUser})
  }

  save() {
    console.log(this.profileForm.value, "this.profileForm.value.name");
    let formData = new FormData();
    formData.append('ID',this.userData.ID);
    formData.append('user_profile',this.userData.user_profile);
    formData.append('first_name',this.profileForm.value.name);
    formData.append('last_name',this.profileForm.value.lastname);
    formData.append('user_address',this.profileForm.value.address);
    formData.append('user_gender',this.profileForm.value.gender);
    formData.append('mobile_no',this.profileForm.value.mobilenumber);
    formData.append('user_dob',this.profileForm.value.datebirth);
    formData.append('my_bio',this.profileForm.value.myBio);
    formData.append('select_country',this.profileForm.value.country);
    formData.append('select_state',this.profileForm.value.state);

    this.util.presentLoading();
    this.user.saveProfile(formData).subscribe((resp) => {
      let response :any = resp;
      this.util.dismissLoading();
      if(response.status){
        this.storage.set('userData', JSON.stringify(response.all_activities[0]))
        this.util.presentToast('Profile Edited Successfully');
        this.viewCtrl.dismiss();
      }else {
        this.util.presentToast(response.message);
      }
    }, (err) => {
      this.util.dismissLoading();
    });
  }

  setProfileFormData() {
    this.profileForm = this.formBuilder.group(
      {
        name: new FormControl("", Validators.compose([Validators.required])),
        lastname: new FormControl("", Validators.compose([Validators.required])),
        address: new FormControl("", Validators.compose([Validators.required])),
        country: new FormControl(""),
        state: new FormControl(""),
        myBio: new FormControl(""),
        datebirth: new FormControl("", Validators.compose([Validators.required])),
        gender: new FormControl("", Validators.compose([Validators.required])),
        mobilenumber: new FormControl("", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])
        ),
      },
    );
  }

  populateData() {
    if(this.userData.user_profile && this.userData.user_profile != ''){
      this.userImage = this.userData.user_profile;
    }
    this.profileForm.controls.name.setValue(this.userData.first_name);
    this.profileForm.controls.lastname.setValue(this.userData.last_name);
    this.profileForm.controls.address.setValue(this.userData.user_address);
    if (this.userData.user_dob && this.userData.user_dob === '0000-00-00'){
      this.userData.user_dob = '2020-01-01'
    }
    this.profileForm.controls.datebirth.setValue(this.userData.user_dob);
    if(this.userData.user_gender == ''){
      this.userData.user_gender = 'male'
    }
    this.profileForm.controls.gender.setValue(this.userData.user_gender);
    this.profileForm.controls.mobilenumber.setValue(this.userData.mobile_no);
    this.profileForm.controls.myBio.setValue(this.userData.my_bio);

    this.userData.select_country === '' ? this.profileForm.controls.country.setValue('default') : this.profileForm.controls.country.setValue(this.userData.select_country);
    this.userData.select_state === '' ? this.profileForm.controls.state.setValue('default') : this.profileForm.controls.state.setValue(this.userData.select_state);;

  }

  getCountryList() {
    this.user.getCountryList().subscribe((resp) => {
      console.log('response all articles >>>',resp)
      let response : any = resp;
      this.countryList = response.data;
    }, (err) => {
      console.error('ERROR :', err);
    });
  }
}
