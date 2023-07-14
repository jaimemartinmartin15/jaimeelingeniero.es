import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-responsive-layout',
  templateUrl: './responsive-layout.component.html',
  styleUrls: ['./responsive-layout.component.scss'],
})
export class ResponsiveLayoutComponent implements AfterContentInit {
  @ContentChildren('responsiveLayoutTopHeader')
  private topHeaderContent: QueryList<HTMLElement>;
  public showTopHeader: boolean = false;

  @ContentChildren('responsiveLayoutFlexContentHeader')
  private flexContentHeaderContent: QueryList<HTMLElement>;
  public showFlexContentHeader: boolean = false;

  @ContentChildren('responsiveLayoutLeftMenu')
  private leftMenuContent: QueryList<HTMLElement>;
  public showLeftMenu: boolean = false;

  @ContentChildren('responsiveLayoutContentHeader')
  private contentHeaderContent: QueryList<HTMLElement>;
  public showContentHeader: boolean = false;

  @ContentChildren('responsiveLayoutContentFooter')
  private contentFooterContent: QueryList<HTMLElement>;
  public showContentFooter: boolean = false;

  @ContentChildren('responsiveLayoutRightMenu')
  private rightMenuContent: QueryList<HTMLElement>;
  public showRightMenu: boolean = false;

  @ContentChildren('responsiveLayoutFlexContentHeader')
  private flexContentFooterContent: QueryList<HTMLElement>;
  public showFlexContentFooter: boolean = false;

  @ContentChildren('responsiveLayoutBottomFooter')
  private bottomFooterContent: QueryList<HTMLElement>;
  public showBottomFooter: boolean = false;

  ngAfterContentInit() {
    this.showTopHeader = this.topHeaderContent.length > 0;
    this.showFlexContentHeader = this.flexContentHeaderContent.length > 0;
    this.showLeftMenu = this.leftMenuContent.length > 0;
    this.showContentHeader = this.contentHeaderContent.length > 0;
    this.showContentFooter = this.contentFooterContent.length > 0;
    this.showRightMenu = this.rightMenuContent.length > 0;
    this.showFlexContentFooter = this.flexContentFooterContent.length > 0;
    this.showBottomFooter = this.bottomFooterContent.length > 0;
  }
}
