import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React from 'react';
// 
// NOTES: < <TabPanel> & <Tab> are the 2 key components. Former handles 
// content that would go into tab body while later handles Tab name. (so # 
// <Tab> instances dictate # of Tabs)

function AboutPage() {
  const displayPosts = (<Tabs>
    {/* onClick = () => { */}
    <TabList defaultIndex={1} onSelect={index => console.log(index)}>
      <Tab>ABOUT</Tab>
      <Tab>TERMS AND CONDITIONS</Tab>
    </TabList>
    <TabPanel>
      <div className="container">
        <div className="row">
          <div className="col-sm justifyText">
            <h2>COPYRIGHTS</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum. Felis eget nunc lobortis mattis aliquam. Aliquam faucibus purus in massa tempor. Fermentum leo vel orci porta. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Quis auctor elit sed vulputate mi sit. Amet risus nullam eget felis eget. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. </p>
            <p>Nibh praesent tristique magna sit amet. Vel facilisis volutpat est velit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Montes nascetur ridiculus mus mauris vitae. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.</p>
            {/* <p>Quis varius quam quisque id diam vel quam elementum. Integer eget aliquet nibh praesent. Mauris a diam maecenas sed enim ut sem viverra. Dui id ornare arcu odio ut sem nulla pharetra. Tempor commodo ullamcorper a lacus vestibulum sed. Tortor consequat id porta nibh venenatis cras. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Iaculis eu non diam phasellus. Sollicitudin ac orci phasellus egestas. Libero volutpat sed cras ornare arcu dui vivamus. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Nec tincidunt praesent semper feugiat nibh sed. Consectetur libero id faucibus nisl tincidunt eget nullam non. Tempus imperdiet nulla malesuada pellentesque elit eget.</p>
            <p>Sed felis eget velit aliquet. Tellus rutrum tellus pellentesque eu. Morbi tristique senectus et netus et malesuada fames. Tristique et egestas quis ipsum. Non sodales neque sodales ut etiam sit amet nisl purus. Netus et malesuada fames ac turpis egestas integer. Nunc vel risus commodo viverra. Nibh venenatis cras sed felis. Id semper risus in hendrerit. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Facilisi nullam vehicula ipsum a arcu cursus. Nunc faucibus a pellentesque sit. Blandit volutpat maecenas volutpat blandit aliquam. Non odio euismod lacinia at quis risus sed. Eget nullam non nisi est sit amet.</p>*/}
          </div> 
          <div className="col-sm marginTop justifyText">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum. Felis eget nunc lobortis mattis aliquam. Aliquam faucibus purus in massa tempor. Fermentum leo vel orci porta. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Quis auctor elit sed vulputate mi sit. Amet risus nullam eget felis eget. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. </p>
            <p>Nibh praesent tristique magna sit amet. Vel facilisis volutpat est velit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Montes nascetur ridiculus mus mauris vitae. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.</p>
            </div>
          <div className="col-sm marginTop justifyText">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum. Felis eget nunc lobortis mattis aliquam. Aliquam faucibus purus in massa tempor. Fermentum leo vel orci porta. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Quis auctor elit sed vulputate mi sit. Amet risus nullam eget felis eget. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. </p>
            <p>Nibh praesent tristique magna sit amet. Vel facilisis volutpat est velit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Montes nascetur ridiculus mus mauris vitae. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.</p>
            </div>
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <div class="container">
        <div class="row">
          <div className="col-sm justifyText">
            <h2>T & C</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum. Felis eget nunc lobortis mattis aliquam. Aliquam faucibus purus in massa tempor. Fermentum leo vel orci porta. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Quis auctor elit sed vulputate mi sit. Amet risus nullam eget felis eget. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. </p>
            <p>Nibh praesent tristique magna sit amet. Vel facilisis volutpat est velit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Montes nascetur ridiculus mus mauris vitae. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.</p>
            {/* <p>Quis varius quam quisque id diam vel quam elementum. Integer eget aliquet nibh praesent. Mauris a diam maecenas sed enim ut sem viverra. Dui id ornare arcu odio ut sem nulla pharetra. Tempor commodo ullamcorper a lacus vestibulum sed. Tortor consequat id porta nibh venenatis cras. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Iaculis eu non diam phasellus. Sollicitudin ac orci phasellus egestas. Libero volutpat sed cras ornare arcu dui vivamus. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Nec tincidunt praesent semper feugiat nibh sed. Consectetur libero id faucibus nisl tincidunt eget nullam non. Tempus imperdiet nulla malesuada pellentesque elit eget.</p>
            <p>Sed felis eget velit aliquet. Tellus rutrum tellus pellentesque eu. Morbi tristique senectus et netus et malesuada fames. Tristique et egestas quis ipsum. Non sodales neque sodales ut etiam sit amet nisl purus. Netus et malesuada fames ac turpis egestas integer. Nunc vel risus commodo viverra. Nibh venenatis cras sed felis. Id semper risus in hendrerit. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Facilisi nullam vehicula ipsum a arcu cursus. Nunc faucibus a pellentesque sit. Blandit volutpat maecenas volutpat blandit aliquam. Non odio euismod lacinia at quis risus sed. Eget nullam non nisi est sit amet.</p>*/}
          </div> 
          <div className="col-sm marginTop justifyText">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum. Felis eget nunc lobortis mattis aliquam. Aliquam faucibus purus in massa tempor. Fermentum leo vel orci porta. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Quis auctor elit sed vulputate mi sit. Amet risus nullam eget felis eget. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. </p>
            <p>Nibh praesent tristique magna sit amet. Vel facilisis volutpat est velit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Montes nascetur ridiculus mus mauris vitae. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.</p>
            </div>
          <div className="col-sm marginTop justifyText">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum. Felis eget nunc lobortis mattis aliquam. Aliquam faucibus purus in massa tempor. Fermentum leo vel orci porta. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Quis auctor elit sed vulputate mi sit. Amet risus nullam eget felis eget. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. </p>
            <p>Nibh praesent tristique magna sit amet. Vel facilisis volutpat est velit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Montes nascetur ridiculus mus mauris vitae. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim.</p>
            </div>
        </div>
      </div>
    </TabPanel>
  </Tabs>);

  return (
    <React.Fragment>
      <div className="jumbotron">
        {displayPosts}
      </div>
    </React.Fragment>);
}



export default AboutPage;
