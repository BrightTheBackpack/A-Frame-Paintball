var cam = document.getElementById('rig');
var camera = document.getElementById('camera');
document.querySelector('a-cursor').addEventListener('click', function(event) {

    if (cam && cam.object3D) {
        var position = cam.object3D.position; 
        var rotation = camera.object3D.rotation
        // console.log(cam.object3D)
        var direction = new THREE.Vector3(0, 0, -1);
        direction.applyEuler(rotation);
        var randomColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;

        var velocity = direction.multiplyScalar(200); // Adjust 10 to control speed

    } else {
        if(cam === null) console.error('Cannot create sphere, cam is null');
        console.error('Cannot create sphere, cam or cam.object3D is null');
    }
    var sphere = document.createElement('a-sphere');
    sphere.setAttribute('color', randomColor);
    sphere.setAttribute('dynamic-body', '');
    sphere.addEventListener('collide', function(event) {
        var target = event.detail.target; // The entity that was hit
        var body = event.detail.body; // The entity that caused the hit
        var contact = event.detail.contact;
        var contactPoint = target.position; // Use ri for contact point
        var hitNormal = body.quaternion;

        console.log('Collision detected:', event.detail);
        console.log('Contact point:', contactPoint);
        console.log('Hit normal:', hitNormal);
        console.log('Target:', target);
        console.log('Body:', body);
        var splatter = document.createElement('a-plane');
        
        splatter.setAttribute('position', `${contactPoint.x} ${contactPoint.y} ${contactPoint.z}`);
        var euler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(hitNormal.x, hitNormal.y, hitNormal.z, hitNormal.w));
        splatter.setAttribute('rotation', `${THREE.Math.radToDeg(euler.x)} ${THREE.Math.radToDeg(euler.y)} ${THREE.Math.radToDeg(euler.z)}`);
        
        splatter.setAttribute('width', '1.0');
        splatter.setAttribute('height', '1.0');
        splatter.setAttribute('color', randomColor);
        splatter.setAttribute('opacity', '1.0');
        


        document.querySelector('a-scene').appendChild(splatter);
        console.log('Player has collided with sphere', "spawning at:", contactPoint);

        sphere.parentNode.removeChild(sphere);
    });
    const forward = new THREE.Vector3(0, 0, -3);
    forward.applyEuler(rotation);
    // forward.normalize(); 
    const spherePosition = new THREE.Vector3(
        position.x + forward.x,
        position.y + 1.6, // Adjust for height (if needed)
        position.z + forward.z
      );
      console.log(position)
      console.log(spherePosition)
    sphere.setAttribute('position', `${spherePosition.x} ${spherePosition.y} ${spherePosition.z}`);
    console.log(rotation)
    sphere.setAttribute('velocity', `${velocity.x} ${velocity.y} ${velocity.z}`);
    document.querySelector('a-scene').appendChild(sphere);
});
