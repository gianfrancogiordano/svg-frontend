import { Component, OnInit } from '@angular/core';
import { SettingServiceService } from 'src/app/services/setting-service.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingServiceService: SettingServiceService) { }

  ngOnInit(): void {
    this.settingServiceService.checkCurrentTheme();
  }

  changeColor( color: string ) {
    this.settingServiceService.changeColor( color );
  }

}
