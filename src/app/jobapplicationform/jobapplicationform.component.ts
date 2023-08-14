import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from './service/job.service';
import { toasterClass } from '../toaster/toaster.class';
import { DashboardService } from '../dashboard/service/dashboard.service';

@Component({
  selector: 'app-jobapplicationform',
  templateUrl: './jobapplicationform.component.html',
  styleUrls: ['./jobapplicationform.component.css']
})
export class JobapplicationformComponent implements OnInit {

  jobApplicationForm: FormGroup;
  submit = false;
  workExperience = [
    {
      companyName: '',
      designation: '',
      startDate:'',
      endDate: ''
    }
  ];
  technologyLeval = [
    {value: 'beginner', name: 'Beginner'},
    {value: 'mediator', name: 'Mediator'},
    {value: 'expert', name: 'Expert'},
  ];

  editId = '';
  language= [
    {langulageName: 'English', read: false, write: false, speak: false, languageSelected: true },
    {langulageName: 'Hindi', read: false, write: false, speak: false, languageSelected: true },
    {langulageName: 'Gujarati', read: false, write: false, speak: false, languageSelected: true },
  ]

  locationName = [
    { name: 'Ahmedabad', value: 'ahmedabad'},
    { name: 'Pune', value: 'pune'},
    { name: 'Bengaluru', value: 'bengaluru'}
  ]

  constructor(private fb: FormBuilder,
    private jobApplicationService: JobService,
    private toaster: toasterClass,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router) {
      this.jobApplicationForm = this.fb.group({
        name: [null, Validators.compose([Validators.required])],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        address: [null, Validators.compose([Validators.required])],
        gender: ['', Validators.compose([Validators.required])],
        contactNumber: [null, Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
        // in Education Don't need validation
        sscMarks: [null],
        sscBoard: [null],
        hscMarks: [null],
        hscBoard: [null],
        graduationCGPA: [null],
        graduationUniversity: [null],
        masterDegreeCGPA: [null],
        masterDegreeUniversity: [null],

        workExperience: [null],
        knownLanguage: [null],

        technialExperiance: [null, Validators.compose([Validators.required])],
        technicalDetails: [null],
        preferredLocation: [null, Validators.compose([Validators.required])],
        expectedCTC: [null, Validators.compose([Validators.required])],
        currentCTC: [null],
        noticePeriod: [null],
      });
    }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
    this.editId = this.route.snapshot.paramMap.get('id') || '';
    this.getEditIdData(this.editId);
    }
  }

  getEditIdData(editId: string) {
    this.dashboardService.getDataById(editId).subscribe((res: any) => {
      if (res && res.data) {
        this.setFormValue(res.data);
      }
    });
  }

  setFormValue(formvalue: any) {

    this.jobApplicationForm.patchValue({name: formvalue?.name});
    this.jobApplicationForm.patchValue({email: formvalue?.email});
    this.jobApplicationForm.patchValue({address: formvalue?.address});
    this.jobApplicationForm.patchValue({gender: formvalue?.gender});
    this.jobApplicationForm.patchValue({contactNumber: formvalue?.contactNumber});
    this.jobApplicationForm.patchValue({sscMarks: formvalue?.sscMarks});
    this.jobApplicationForm.patchValue({sscBoard: formvalue?.sscBoard});
    this.jobApplicationForm.patchValue({hscMarks: formvalue?.hscMarks});
    this.jobApplicationForm.patchValue({hscBoard: formvalue?.hscBoard});

    this.jobApplicationForm.patchValue({graduationCGPA: formvalue?.graduationCGPA});
    this.jobApplicationForm.patchValue({graduationUniversity: formvalue?.graduationUniversity});

    this.jobApplicationForm.patchValue({masterDegreeCGPA: formvalue?.masterDegreeCGPA});
    this.jobApplicationForm.patchValue({masterDegreeUniversity: formvalue?.masterDegreeUniversity});

    this.jobApplicationForm.patchValue({workExperience: formvalue?.workExperienceDetails});

    this.jobApplicationForm.patchValue({knownLanguage: formvalue?.knownLanguage});

    this.jobApplicationForm.patchValue({technialExperiance: formvalue?.technialExperiance});
    this.jobApplicationForm.patchValue({technicalDetails: formvalue?.technicalDetails});

    this.jobApplicationForm.patchValue({preferredLocation: formvalue?.preferredLocation});

    this.jobApplicationForm.patchValue({expectedCTC: formvalue?.expectedCTC});

    this.jobApplicationForm.patchValue({currentCTC: formvalue?.currentCTC});

    this.jobApplicationForm.patchValue({noticePeriod: formvalue?.noticePeriod});

    this.workExperience = formvalue?.workExperienceDetails;
    this.language = [...formvalue?.knownLanguage];
    // if(formvalue?.workExperienceDetails && formvalue?.workExperienceDetails.length) {
    //   formvalue?.workExperienceDetails.forEach((item: any) => {
    //     this.workExperience.push(item);
    //   });
    // }
  }
  addWorkExperience() {
    this.workExperience.push({
      companyName: '',
      designation: '',
      startDate:'',
      endDate: ''
    })
  }

  removeWorkExpp(i: number) {
    this.workExperience.splice(i, 1);
  }

  languageSelected(event: any, i: number) {
    if (event.checked) {
      this.language[i].languageSelected = false;
    } else {
      this.language[i].languageSelected = true;
      this.language[i].read = false;
      this.language[i].write = false;
      this.language[i].speak = false;
    }
  }

  selectLanguageOption(event: any, i: number, value: any) {
    if (event.checked) {
      if (value == 'read') {
      this.language[i]['read'] = true;
      } else if(value == 'write') {
        this.language[i]['write'] = true;
      } else if (value == 'speak') {
        this.language[i]['speak'] = true;
      }
    } else {
      if (value == 'read') {
        this.language[i]['read'] = false;
        } else if(value == 'write') {
          this.language[i]['write'] = false;
        } else if (value == 'speak') {
          this.language[i]['speak'] = false;
        }

    }

  }

  saveApplication() {
    this.submit = true
    if (this.jobApplicationForm.invalid) {
      return
    }

    this.jobApplicationForm.value['workExperienceDetails'] = this.workExperience;
    this.jobApplicationForm.value['knownLanguage'] = this.language;

    if (this.editId) {
      this.jobApplicationService.updateJob(this.jobApplicationForm.value, this.editId).subscribe((res: any) => {
        if (res && res.data) {
          this.toaster.showToaster('success', res.message);
          this.router.navigate(['']);
        }
      });
    } else {
      this.jobApplicationService.saveJob(this.jobApplicationForm.value).subscribe((res: any) => {
        this.toaster.showToaster('success', res.message);
        this.router.navigate(['']);
      }, error => {
        this.toaster.showToaster('error', error.error.message);
      });
    }
  }

  getErrorMessage() {
    if (this.jobApplicationForm.hasError('required')) {
      return 'Gender Required!'
    }
    return;
  }
}
