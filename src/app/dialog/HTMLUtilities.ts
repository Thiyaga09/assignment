/**
 * Created by Bibek on 5/20/2017.
 */
export class HTMLElementUtil {
  //This will support all browser
  public static RemoveElement(el: HTMLElement): void {
    if (el && el.parentNode){
      el.parentNode.removeChild(el);
      let v=el.querySelector('video');
      if(v){
        v.pause();
        v.currentTime=0;
        v.src='';
        v.load();
      }

    }

  }
}
