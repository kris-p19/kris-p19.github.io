---
layout: default
title: "สอนตั้งค่า Public DNS: Google, Cloudflare และผู้ให้บริการอื่น ๆ"
description: "สอนตั้งค่า Public DNS: Google, Cloudflare และผู้ให้บริการอื่น ๆ"
keywords: "สอนตั้งค่า Public DNS: Google, Cloudflare และผู้ให้บริการอื่น ๆ"
urlx: "https://fintechxhub.com/technology/dns"
image: "https://s6.imgcdn.dev/YwBzin.jpg"
navTechnology: "active"
---
<div class="tags-widget widget-item">
    <article>
        <h1 class="mb-4">สอนตั้งค่า Public DNS: Google, Cloudflare และผู้ให้บริการอื่น ๆ</h1>
        <p>ในการใช้งานอินเทอร์เน็ตทุกวันนี้ "ความเร็ว" และ "ความปลอดภัย" เป็นเรื่องสำคัญมาก ๆ ซึ่งหนึ่งในวิธีง่าย ๆ ที่ช่วยเพิ่มทั้งความเร็วและความปลอดภัยได้ก็คือ <strong>การเปลี่ยน DNS Server</strong> นั่นเอง วันนี้เราจะมาสอนวิธีตั้งค่า Public DNS แบบละเอียด พร้อมแนะนำตัวเลือกยอดนิยมอย่าง <strong>Google DNS</strong>, <strong>Cloudflare DNS</strong> และผู้ให้บริการอื่น ๆ ที่น่าสนใจ</p>
        <hr>
        <h2 class="mt-5">DNS คืออะไร?</h2>
        <p>DNS (Domain Name System) คือระบบที่ช่วยแปลงชื่อเว็บไซต์ (เช่น <code>www.google.com</code>) เป็น IP Address (เช่น <code>142.250.190.4</code>) ซึ่งคอมพิวเตอร์ต้องใช้ในการเชื่อมต่อกับเว็บไซต์</p>
        <div class="alert alert-info">
            <strong>เปรียบเทียบง่าย ๆ</strong> : DNS คือ "สมุดโทรศัพท์" ของโลกอินเทอร์เน็ตนั่นเอง!
        </div>
        <p>หาก DNS ทำงานได้รวดเร็ว ก็เหมือนคุณหาเบอร์โทรได้เร็ว ทำให้การเข้าเว็บไซต์ต่าง ๆ โหลดไวขึ้นนั่นเอง</p>
        <hr>
        <h2 class="mt-5">ทำไมต้องเปลี่ยนมาใช้ Public DNS?</h2>
            <ul class="list-group mb-4">
            <li class="list-group-item">เพิ่ม <strong>ความเร็ว</strong> ในการเข้าถึงเว็บไซต์</li>
            <li class="list-group-item">เพิ่ม <strong>ความปลอดภัย</strong> ด้วยการกรองเว็บไซต์ที่มีมัลแวร์</li>
            <li class="list-group-item">ป้องกันการถูกแฮกหรือเปลี่ยนเส้นทาง (DNS hijacking)</li>
            <li class="list-group-item">บางกรณีช่วย <strong>หลีกเลี่ยงการบล็อกเว็บไซต์</strong> จากผู้ให้บริการอินเทอร์เน็ตบางรายได้</li>
        </ul>
        <hr>
        <h2 class="mt-5">Public DNS ยอดนิยม</h2>
        <div class="table-responsive mb-4">
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ผู้ให้บริการ</th>
                        <th>IP Address</th>
                        <th>จุดเด่น</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Google DNS</strong></td>
                        <td>8.8.8.8 / 8.8.4.4</td>
                        <td>เสถียร รวดเร็ว เชื่อถือได้</td>
                    </tr>
                    <tr>
                        <td><strong>Cloudflare DNS</strong></td>
                        <td>1.1.1.1 / 1.0.0.1</td>
                        <td>โฟกัสเรื่องความเป็นส่วนตัว</td>
                    </tr>
                    <tr>
                        <td><strong>OpenDNS (Cisco)</strong></td>
                        <td>208.67.222.222 / 208.67.220.220</td>
                        <td>มีระบบกรองเว็บอันตราย</td>
                    </tr>
                    <tr>
                        <td><strong>Quad9 DNS</strong></td>
                        <td>9.9.9.9</td>
                        <td>เน้นป้องกันมัลแวร์และความปลอดภัยสูง</td>
                    </tr>
                    <tr>
                        <td><strong>AdGuard DNS</strong></td>
                        <td>94.140.14.14 / 94.140.15.15</td>
                        <td>บล็อกโฆษณาและมัลแวร์อัตโนมัติ</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <hr>
        <h2 class="mt-5">วิธีตั้งค่า Public DNS บน Windows 10/11</h2>
        <ol class="list-group list-group-numbered mb-4">
            <li class="list-group-item">คลิกขวาที่ไอคอน <strong>Wi-Fi</strong> หรือ <strong>Network</strong> ที่ Taskbar เลือก <strong>Network & Internet settings</strong></li>
            <li class="list-group-item">เลือก <strong>Change adapter options</strong></li>
            <li class="list-group-item">คลิกขวาที่อุปกรณ์ที่เชื่อมต่ออยู่ เลือก <strong>Properties</strong></li>
            <li class="list-group-item">เลือก <strong>Internet Protocol Version 4 (TCP/IPv4)</strong> แล้วกด <strong>Properties</strong></li>
            <li class="list-group-item">
                เลือก <strong>Use the following DNS server addresses</strong> แล้วกรอก IP DNS ที่ต้องการ เช่น:
                <ul>
                    <li><strong>Preferred DNS server</strong>: 8.8.8.8</li>
                    <li><strong>Alternate DNS server</strong>: 8.8.4.4</li>
                </ul>
            </li>
            <li class="list-group-item">กด <strong>OK</strong> เพื่อบันทึก</li>
        </ol>
        <div class="alert alert-warning">
            <strong>Tip</strong> : สำหรับ <strong>Cloudflare</strong> ก็แค่เปลี่ยนเป็น 1.1.1.1 และ 1.0.0.1
        </div>
        <hr>
        <h2 class="mt-5">วิธีตั้งค่า Public DNS บนมือถือ Android</h2>
        <ol class="list-group list-group-numbered mb-4">
            <li class="list-group-item">เข้าไปที่ <strong>Settings</strong> → <strong>Network & Internet</strong> → <strong>Wi-Fi</strong></li>
            <li class="list-group-item">กดค้างที่ชื่อ Wi-Fi ที่เชื่อมต่อ → เลือก <strong>Modify network</strong></li>
            <li class="list-group-item">เลือก <strong>Advanced options</strong> → <strong>IP settings</strong> เปลี่ยนจาก DHCP เป็น <strong>Static</strong></li>
            <li class="list-group-item">ตั้งค่า DNS 1 และ DNS 2 ตามที่ต้องการ เช่น Google หรือ Cloudflare</li>
            <li class="list-group-item">บันทึกการตั้งค่า</li>
        </ol>
        <hr>
        <h2 class="mt-5">วิธีตั้งค่า Public DNS บน iPhone/iPad (iOS)</h2>
        <ol class="list-group list-group-numbered mb-4">
            <li class="list-group-item">ไปที่ <strong>Settings</strong> → <strong>Wi-Fi</strong></li>
            <li class="list-group-item">กดไอคอน ⓘ ข้างชื่อ Wi-Fi</li>
            <li class="list-group-item">เลื่อนลงมาเลือก <strong>Configure DNS</strong> → เปลี่ยนจาก <strong>Automatic</strong> เป็น <strong>Manual</strong></li>
            <li class="list-group-item">ลบ DNS เดิมออก แล้วเพิ่ม IP DNS ใหม่ เช่น 1.1.1.1 และ 1.0.0.1</li>
            <li class="list-group-item">กด <strong>Save</strong></li>
        </ol>
        <hr>
        <h2 class="mt-5">สรุป</h2>
        <p>การตั้งค่า <strong>Public DNS</strong> เป็นเรื่องง่ายมาก และสามารถทำได้เองภายในไม่กี่นาที ช่วยให้คุณมีประสบการณ์ท่องเว็บที่ <strong>เร็วขึ้น</strong>, <strong>ปลอดภัยขึ้น</strong> และ <strong>เป็นส่วนตัวมากขึ้น</strong> ไม่ว่าคุณจะเลือกใช้ Google DNS, Cloudflare DNS หรือเจ้าอื่น ๆ ก็ได้ตามความต้องการเลยครับ!</p>
        <div class="alert alert-success mt-4">
            ✏️ <strong>เพิ่มเติม</strong> : ถ้าอยากให้เร็วสุด ๆ คุณสามารถใช้โปรแกรมช่วยเช็ก "DNS ที่เร็วที่สุด" สำหรับคุณ เช่น <strong>Namebench</strong> หรือ <strong>DNS Benchmark</strong> ได้ด้วยนะ!
        </div>
        <hr>
        <p class="text-center mt-5"><strong>แล้วคุณล่ะ? ใช้ DNS ของค่ายไหนอยู่? มาแชร์ประสบการณ์กันได้ที่คอมเมนต์เลย! 🚀</strong></p>
    </article>
</div>